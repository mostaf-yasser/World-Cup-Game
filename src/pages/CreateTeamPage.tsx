import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { Card, CardBody } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { PlayerCard } from '../components/PlayerCard';
import { createFantasyTeam, getPlayers, addPlayerToTeam, checkTeamNameExists, updateFantasyTeam, getFantasyTeamByUserId, getTeamPlayers, clearTeamPlayers, getCurrentRound } from '../services/database';
import type { Player, PlayerPosition, Round } from '../lib/supabase';
import { Trophy, Users, Shield, Goal, Hand, X, Loader2 } from 'lucide-react';

const STARTER_REQ = { FWD: 2, MID: 1, DEF: 1, GK: 1 };
const BENCH_REQ = { FWD: 1, MID: 1, DEF: 1, GK: 1 };

export function CreateTeamPage() {
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [managerName, setManagerName] = useState(profile?.display_name || '');
  const [existingTeam, setExistingTeam] = useState<string | null>(null);
  const [starters, setStarters] = useState<Player[]>([]);
  const [bench, setBench] = useState<Player[]>([]);
  const [captain, setCaptain] = useState<string | null>(null);
  const [viceCaptain, setViceCaptain] = useState<string | null>(null);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<PlayerPosition | 'ALL'>('ALL');
  const [selectedSection, setSelectedSection] = useState<'starters' | 'bench'>('starters');
  const [positionToAdd, setPositionToAdd] = useState<PlayerPosition | null>(null);
  const [playerModal, setPlayerModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { if (user) loadData(); }, [user]);

  const loadData = async () => {
    if (!user) return;
    try {
      const [playersData, existing, roundData] = await Promise.all([
        getPlayers(),
        getFantasyTeamByUserId(user.id),
        getCurrentRound()
      ]);
      setAllPlayers(playersData);
      setCurrentRound(roundData);
      if (existing) {
        setExistingTeam(existing.id);
        setTeamName(existing.name);
        setManagerName(existing.manager_name);
        setCaptain(existing.captain_id);
        setViceCaptain(existing.vice_captain_id);
        const teamPlayers = await getTeamPlayers(existing.id);
        setStarters(teamPlayers.filter(tp => tp.is_starter).map(tp => tp.player));
        setBench(teamPlayers.filter(tp => !tp.is_starter).map(tp => tp.player));
      }
    } finally { setLoading(false); }
  };

  const getFilteredPlayers = () => {
    let players = allPlayers;
    if (selectedPosition !== 'ALL') players = players.filter(p => p.position === selectedPosition);
    const selectedIds = [...starters, ...bench].map(p => p.id);
    return players.filter(p => !selectedIds.includes(p.id));
  };

  const canAddStarter = (pos: PlayerPosition) => starters.filter(p => p.position === pos).length < STARTER_REQ[pos];
  const canAddBench = (pos: PlayerPosition) => bench.filter(p => p.position === pos).length < BENCH_REQ[pos];

  const handleOpenPlayerModal = (section: 'starters' | 'bench', pos: PlayerPosition) => {
    if (section === 'starters' && !canAddStarter(pos)) return;
    if (section === 'bench' && !canAddBench(pos)) return;
    setSelectedSection(section); setPositionToAdd(pos); setSelectedPosition(pos); setPlayerModal(true);
  };

  const handleAddPlayer = (player: Player) => {
    if (selectedSection === 'starters') setStarters([...starters, player]);
    else setBench([...bench, player]);
    setPlayerModal(false);
  };

  const handleRemovePlayer = (playerId: string, section: 'starters' | 'bench') => {
    if (section === 'starters') { setStarters(starters.filter(p => p.id !== playerId)); if (captain === playerId) setCaptain(null); if (viceCaptain === playerId) setViceCaptain(null); }
    else setBench(bench.filter(p => p.id !== playerId));
  };

  const validateTeam = () => {
    if (!teamName.trim()) return t('errorTeamNameRequired');
    if (!managerName.trim()) return t('errorManagerNameRequired');
    for (const [pos, req] of Object.entries(STARTER_REQ)) { if (starters.filter(p => p.position === pos).length !== req) return t('errorNeedStarters', { count: req, pos }); }
    for (const [pos, req] of Object.entries(BENCH_REQ)) { if (bench.filter(p => p.position === pos).length !== req) return t('errorNeedBench', { count: req, pos }); }
    if (!captain) return t('errorSelectCaptain');
    if (!viceCaptain) return t('errorSelectViceCaptain');
    if (captain === viceCaptain) return t('errorCaptainDifferent');

    if (!currentRound || currentRound.stage === 'group') {
      const teamCounts: Record<string, number> = {};
      const allSelected = [...starters, ...bench];
      for (const p of allSelected) {
        teamCounts[p.national_team] = (teamCounts[p.national_team] || 0) + 1;
        if (teamCounts[p.national_team] > 2) {
          return t('errorTransferLimitTeam', { team: p.national_team });
        }
      }
    }
    return null;
  };

  const handleSaveTeam = async () => {
    if (!user) return;
    const validationError = validateTeam();
    if (validationError) { setError(validationError); return; }
    setSaving(true); setError('');
    try {
      if (!existingTeam) { const nameExists = await checkTeamNameExists(teamName); if (nameExists) { setError('Team name already taken'); setSaving(false); return; } }
      let teamId: string;
      if (existingTeam) {
        await updateFantasyTeam(existingTeam, { name: teamName, manager_name: managerName, captain_id: captain, vice_captain_id: viceCaptain });
        teamId = existingTeam;
        await clearTeamPlayers(teamId);
      } else {
        const newTeam = await createFantasyTeam({ user_id: user.id, name: teamName, manager_name: managerName, captain_id: captain, vice_captain_id: viceCaptain });
        teamId = newTeam.id;
      }
      for (const player of starters) await addPlayerToTeam(teamId, player.id, true);
      for (const player of bench) await addPlayerToTeam(teamId, player.id, false);
      navigate('/my-team');
    } catch (err: any) { setError(err.message || 'Failed to save team'); } finally { setSaving(false); }
  };

  if (loading) return <div className="min-h-screen bg-world-cup flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>;

  const PositionSlot = ({ pos, count, section }: { pos: PlayerPosition; count: number; section: 'starters' | 'bench' }) => {
    const players = section === 'starters' ? starters.filter(p => p.position === pos) : bench.filter(p => p.position === pos);
    const current = players[count - 1];
    const canAdd = section === 'starters' ? canAddStarter(pos) : canAddBench(pos);
    const icon = pos === 'GK' ? Hand : pos === 'DEF' ? Shield : pos === 'MID' ? Users : Goal;

    return (
      <div className="relative">
        <div onClick={() => current ? null : handleOpenPlayerModal(section, pos)}
          className={`min-h-[60px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${current ? 'border-dark-600 bg-dark-700/30' : canAdd ? 'border-dark-500 bg-dark-700/30 hover:border-primary-500/50 cursor-pointer' : 'border-dark-600 bg-dark-700/20 opacity-50'}`}>
          {current ? (
            <div className="w-full p-2 relative">
              <PlayerCard player={current} compact showStatus={false} />
              <div className="mt-2 flex items-center gap-2">
                <button onClick={() => handleRemovePlayer(current.id, section)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
                {section === 'starters' && captain !== current.id && viceCaptain !== current.id && (<><button onClick={() => setCaptain(current.id)} className="text-xs text-primary-400">C</button><button onClick={() => setViceCaptain(current.id)} className="text-xs text-dark-400">VC</button></>)}
              </div>
              {captain === current.id && <span className="absolute top-0 right-0 bg-gold-400 text-dark-900 text-xs font-bold px-1.5 py-0.5 rounded">C</span>}
              {viceCaptain === current.id && <span className="absolute top-0 right-0 bg-dark-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">VC</span>}
            </div>
          ) : <>{icon instanceof Function && <icon className="w-4 h-4 text-dark-400" />}<span className="text-xs text-dark-400">{pos}</span></>}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-world-cup py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8"><h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{existingTeam ? 'Edit Your Team' : 'Create Your Fantasy Team'}</h1><p className="text-dark-300">Pick your squad and compete for glory</p></div>

        {error && <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm mb-6"><X className="w-4 h-4 shrink-0" />{error}</div>}

        <Card className="mb-6">
          <CardBody className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Team Name" placeholder="Enter team name" value={teamName} onChange={(e) => setTeamName(e.target.value)} required />
              <Input label="Manager Name" placeholder="Your manager name" value={managerName} onChange={(e) => setManagerName(e.target.value)} required />
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardBody>
            <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-primary-400" />Starting XI</h2>
            <div className="space-y-4">
              {['FWD', 'MID', 'DEF', 'GK'].map(pos => (
                <div key={pos}>
                  <p className="text-xs font-medium text-dark-300 mb-2">{pos} {pos === 'FWD' ? '(2)' : '(1)'}</p>
                  <div className={`grid ${pos === 'FWD' ? 'grid-cols-2' : 'grid-cols-1 max-w-xs'} gap-3`}>
                    {Array.from({ length: pos === 'FWD' ? 2 : 1 }).map((_, i) => (
                      <PositionSlot key={i} pos={pos as PlayerPosition} count={i + 1} section="starters" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardBody>
            <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-dark-400" />Bench</h2>
            <p className="text-dark-400 text-sm mb-4">One bench player can auto-sub for a missing starter per round.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['FWD', 'MID', 'DEF', 'GK'].map(pos => (
                <PositionSlot key={pos} pos={pos as PlayerPosition} count={1} section="bench" />
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardBody>
            <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2"><Trophy className="w-5 h-5 text-gold-400" />Captain & Vice Captain</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-dark-700/50 rounded-xl border border-dark-600">
                <p className="text-sm text-dark-300 mb-2">Captain (x2 points)</p>
                {captain ? <span className="text-white">{starters.find(s => s.id === captain)?.name}</span> : <p className="text-dark-400 text-sm">Click "C" on a starter</p>}
              </div>
              <div className="p-4 bg-dark-700/50 rounded-xl border border-dark-600">
                <p className="text-sm text-dark-300 mb-2">Vice Captain</p>
                {viceCaptain ? <span className="text-white">{starters.find(s => s.id === viceCaptain)?.name}</span> : <p className="text-dark-400 text-sm">Click "VC" on a starter</p>}
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => navigate('/dashboard')}>Cancel</Button>
          <Button onClick={handleSaveTeam} loading={saving} className="flex-1">{existingTeam ? 'Update Team' : 'Create Team'}</Button>
        </div>
      </div>

      <Modal isOpen={playerModal} onClose={() => setPlayerModal(false)} title={`Select ${positionToAdd}`} size="xl">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {['ALL', 'GK', 'DEF', 'MID', 'FWD'].map(pos => (
              <button key={pos} onClick={() => setSelectedPosition(pos as PlayerPosition | 'ALL')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${selectedPosition === pos ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:bg-dark-600'}`}>{pos}</button>
            ))}
          </div>
          <div className="max-h-[60vh] overflow-y-auto space-y-2 pr-2">
            {getFilteredPlayers().length === 0 ? <p className="text-dark-400 text-center py-8">No available players</p> :
              getFilteredPlayers().map(player => (
                <div key={player.id} onClick={() => handleAddPlayer(player)} className="cursor-pointer hover:bg-dark-700 rounded-xl"><PlayerCard player={player} showStatus /></div>
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
