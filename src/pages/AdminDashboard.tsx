import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layout } from '../components/Layout';
import { Card, CardBody, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { PlayerCard } from '../components/PlayerCard';
import { getRounds, createRound, updateRound, getFantasyTeamByUserId, getAllFantasyTeams, getTeamPlayers, getPlayers, createPlayer, updatePlayer, deletePlayer, getPlayerStats, createOrUpdatePlayerStats, recalculateAllTeamPoints } from '../services/database';
import type { Player, Round, FantasyTeam, PlayerPosition, PlayerStatus, RoundStage } from '../lib/supabase';
import { Shield, Users, BarChart3, Plus, Edit, Trash2, Lock, Unlock, CheckCircle, Loader2, RefreshCw, Trophy } from 'lucide-react';

type Tab = 'overview' | 'players' | 'rounds' | 'stats' | 'teams';
const STAGES: RoundStage[] = ['group', 'round_of_32', 'round_of_16', 'quarter_final', 'semi_final', 'third_place', 'final'];
const POSITIONS: PlayerPosition[] = ['GK', 'DEF', 'MID', 'FWD'];
const STATUSES: PlayerStatus[] = ['available', 'injured', 'suspended', 'eliminated'];

export function AdminDashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [teams, setTeams] = useState<FantasyTeam[]>([]);
  const [playerModal, setPlayerModal] = useState(false);
  const [roundModal, setRoundModal] = useState(false);
  const [statsModal, setStatsModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [editingRound, setEditingRound] = useState<Round | null>(null);
  const [playerForm, setPlayerForm] = useState({ name: '', national_team: '', position: 'FWD' as PlayerPosition, photo_url: '', status: 'available' as PlayerStatus });
  const [roundForm, setRoundForm] = useState({ name: '', round_number: 1, stage: 'group' as RoundStage, start_date: '', end_date: '' });
  const [selectedRoundForStats, setSelectedRoundForStats] = useState('');
  const [selectedPlayerForStats, setSelectedPlayerForStats] = useState('');
  const [statsForm, setStatsForm] = useState({ win_match: false, goals: 0, assists: 0, man_of_the_match: false, penalty_save: false, clean_sheet: false, red_card: false, played_minutes: 0 });

  useEffect(() => { if (profile && !profile.is_admin) navigate('/dashboard'); else loadData(); }, [profile]);

  const loadData = async () => {
    try {
      const [playersData, roundsData, teamsData] = await Promise.all([getPlayers(), getRounds(), getAllFantasyTeams()]);
      setPlayers(playersData); setRounds(roundsData); setTeams(teamsData);
    } finally { setLoading(false); }
  };

  const handleOpenPlayerModal = (player?: Player) => {
    if (player) { setEditingPlayer(player); setPlayerForm({ name: player.name, national_team: player.national_team, position: player.position, photo_url: player.photo_url || '', status: player.status }); }
    else { setEditingPlayer(null); setPlayerForm({ name: '', national_team: '', position: 'FWD', photo_url: '', status: 'available' }); }
    setPlayerModal(true);
  };

  const handleSavePlayer = async () => {
    setSaving(true);
    try { if (editingPlayer) await updatePlayer(editingPlayer.id, playerForm); else await createPlayer(playerForm); setPlayerModal(false); loadData(); }
    finally { setSaving(false); }
  };

  const handleDeletePlayer = async (id: string) => { if (confirm('Delete this player?')) { await deletePlayer(id); loadData(); } };

  const handleOpenRoundModal = (round?: Round) => {
    if (round) { setEditingRound(round); setRoundForm({ name: round.name, round_number: round.round_number, stage: round.stage, start_date: round.start_date?.split('T')[0] || '', end_date: round.end_date?.split('T')[0] || '' }); }
    else { setEditingRound(null); const nextNumber = rounds.length > 0 ? Math.max(...rounds.map(r => r.round_number)) + 1 : 1; setRoundForm({ name: '', round_number: nextNumber, stage: 'group', start_date: '', end_date: '' }); }
    setRoundModal(true);
  };

  const handleSaveRound = async () => {
    setSaving(true);
    try { if (editingRound) await updateRound(editingRound.id, roundForm); else await createRound(roundForm); setRoundModal(false); loadData(); }
    finally { setSaving(false); }
  };

  const handleToggleTransfers = async (round: Round) => { await updateRound(round.id, { transfers_open: !round.transfers_open }); loadData(); };
  const handleLockRound = async (round: Round) => { await updateRound(round.id, { is_locked: true, transfers_open: false }); loadData(); };
  const handleFinishRound = async (round: Round) => { await updateRound(round.id, { is_finished: true, is_locked: true, transfers_open: false }); await recalculateAllTeamPoints(); loadData(); };

  const handleSaveStats = async () => {
    if (!selectedPlayerForStats || !selectedRoundForStats) return;
    setSaving(true);
    try {
      const player = players.find(p => p.id === selectedPlayerForStats);
      if (!player) return;
      let fantasyPoints = statsForm.red_card ? 0 : (statsForm.win_match ? 1 : 0) + statsForm.goals + statsForm.assists + (statsForm.man_of_the_match ? 1 : 0) + (statsForm.penalty_save ? 1 : 0) + (statsForm.clean_sheet && player.position !== 'FWD' ? 1 : 0);
      await createOrUpdatePlayerStats({ player_id: selectedPlayerForStats, round_id: selectedRoundForStats, ...statsForm, fantasy_points: fantasyPoints });
      setStatsModal(false); loadData();
    } finally { setSaving(false); }
  };

  if (loading) return <Layout><div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div></Layout>;

  const tabs: { id: Tab; label: string; icon: typeof Shield }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'players', label: 'Players', icon: Users },
    { id: 'rounds', label: 'Rounds', icon: Trophy },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'teams', label: 'Teams', icon: Shield }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-red-400" />
          <div><h1 className="font-display text-2xl md:text-3xl font-bold">Admin Dashboard</h1><p className="text-dark-400">Manage players, rounds, and statistics</p></div>
        </div>

        <div className="flex gap-1 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white'}`}>
              <tab.icon className="w-4 h-4" />{tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[{ icon: Users, label: 'Players', value: players.length }, { icon: Trophy, label: 'Rounds', value: rounds.length }, { icon: Shield, label: 'Fantasy Teams', value: teams.length }, { icon: CheckCircle, label: 'Finished Rounds', value: rounds.filter(r => r.is_finished).length }].map((item, i) => (
              <Card key={i}><CardBody className="text-center"><item.icon className="w-8 h-8 text-primary-400 mx-auto mb-2" /><p className="text-3xl font-bold text-white">{item.value}</p><p className="text-dark-400">{item.label}</p></CardBody></Card>
            ))}
          </div>
        )}

        {activeTab === 'players' && (
          <Card>
            <CardHeader><div className="flex items-center justify-between"><h2 className="font-display text-lg font-bold">Players</h2><Button onClick={() => handleOpenPlayerModal()} icon={<Plus className="w-4 h-4" />}>Add Player</Button></div></CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-dark-700/50">
                {players.map(player => (
                  <div key={player.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center"><Users className="w-5 h-5 text-dark-400" /></div>
                      <div><p className="font-medium text-white">{player.name}</p><p className="text-dark-400 text-sm">{player.national_team} - {player.position} - <span className={player.status === 'available' ? 'text-green-400' : player.status === 'injured' ? 'text-red-400' : 'text-yellow-400'}>{player.status}</span></p></div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenPlayerModal(player)} className="p-2"><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeletePlayer(player.id)} className="p-2 text-red-400"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

        {activeTab === 'rounds' && (
          <Card>
            <CardHeader><div className="flex items-center justify-between"><h2 className="font-display text-lg font-bold">Rounds</h2><Button onClick={() => handleOpenRoundModal()} icon={<Plus className="w-4 h-4" />}>Add Round</Button></div></CardHeader>
            <CardBody className="space-y-4">
              {rounds.map(round => (
                <div key={round.id} className="p-4 bg-dark-700/30 rounded-xl border border-dark-600">
                  <div className="flex items-start justify-between mb-3">
                    <div><p className="font-semibold text-white">{round.name}</p><p className="text-dark-400 text-sm capitalize">{round.stage.replace('_', ' ')} - Round {round.round_number}</p></div>
                    <Button variant="ghost" size="sm" onClick={() => handleOpenRoundModal(round)} className="p-2"><Edit className="w-4 h-4" /></Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {round.is_finished && <span className="px-2 py-1 rounded text-xs bg-secondary-500/20 text-secondary-400">Finished</span>}
                    {round.is_locked && !round.is_finished && <span className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400">Locked</span>}
                    {round.transfers_open && <span className="px-2 py-1 rounded text-xs bg-primary-500/20 text-primary-400">Transfers Open</span>}
                  </div>
                  {!round.is_finished && (
                    <div className="flex flex-wrap gap-2">
                      <Button variant={round.transfers_open ? 'secondary' : 'outline'} size="sm" onClick={() => handleToggleTransfers(round)} icon={round.transfers_open ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}>{round.transfers_open ? 'Close' : 'Open'} Transfers</Button>
                      <Button variant="secondary" size="sm" onClick={() => handleLockRound(round)} disabled={round.is_locked}>Lock Round</Button>
                      <Button size="sm" onClick={() => handleFinishRound(round)} className="bg-secondary-500 hover:bg-secondary-600">Finish Round</Button>
                    </div>
                  )}
                </div>
              ))}
            </CardBody>
          </Card>
        )}

        {activeTab === 'stats' && (
          <Card>
            <CardHeader><div className="flex items-center justify-between"><h2 className="font-display text-lg font-bold">Player Statistics</h2><Button variant="secondary" onClick={async () => { await recalculateAllTeamPoints(); loadData(); }} icon={<RefreshCw className="w-4 h-4" />}>Recalculate</Button></div></CardHeader>
            <CardBody>
              <div className="space-y-4">
                {rounds.filter(r => !r.is_finished).map(round => (
                  <div key={round.id} className="p-4 bg-dark-700/30 rounded-xl border border-dark-600">
                    <p className="font-semibold text-white mb-4">{round.name}</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {players.map(player => (
                        <div key={player.id} onClick={() => { setSelectedRoundForStats(round.id); setSelectedPlayerForStats(player.id); setStatsForm({ win_match: false, goals: 0, assists: 0, man_of_the_match: false, penalty_save: false, clean_sheet: false, red_card: false, played_minutes: 0 }); setStatsModal(true); }}
                          className="p-3 bg-dark-700/50 rounded-lg cursor-pointer hover:bg-dark-600 transition-colors">
                          <p className="text-white text-sm truncate">{player.name}</p>
                          <p className="text-dark-400 text-xs">{player.national_team}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

        {activeTab === 'teams' && (
          <Card>
            <CardHeader><h2 className="font-display text-lg font-bold">All Fantasy Teams</h2></CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-dark-700/50">
                {teams.map((team, index) => (
                  <div key={team.id} className="flex items-center gap-4 p-4">
                    <div className="w-8 h-8 rounded-lg bg-dark-600 flex items-center justify-center font-bold text-sm">{index + 1}</div>
                    <div className="w-12 h-12 rounded-xl bg-dark-600 flex items-center justify-center"><Shield className="w-6 h-6 text-dark-400" /></div>
                    <div className="flex-1 min-w-0"><p className="font-medium text-white truncate">{team.name}</p><p className="text-dark-400 text-sm truncate">{team.manager_name}</p></div>
                    <div className="text-right"><p className="font-bold text-white">{team.total_points}</p><p className="text-dark-500 text-xs">pts</p></div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

        <Modal isOpen={playerModal} onClose={() => setPlayerModal(false)} title={editingPlayer ? 'Edit Player' : 'Add Player'} size="md">
          <div className="space-y-4">
            <Input label="Player Name" value={playerForm.name} onChange={(e) => setPlayerForm({ ...playerForm, name: e.target.value })} required />
            <Input label="National Team" value={playerForm.national_team} onChange={(e) => setPlayerForm({ ...playerForm, national_team: e.target.value })} required />
            <div><label className="block text-sm font-medium text-dark-200 mb-1.5">Position</label>
              <div className="flex flex-wrap gap-2">{POSITIONS.map(pos => (
                <button key={pos} type="button" onClick={() => setPlayerForm({ ...playerForm, position: pos })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${playerForm.position === pos ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:bg-dark-600'}`}>{pos}</button>
              ))}</div>
            </div>
            <div><label className="block text-sm font-medium text-dark-200 mb-1.5">Status</label>
              <div className="flex flex-wrap gap-2">{STATUSES.map(status => (
                <button key={status} type="button" onClick={() => setPlayerForm({ ...playerForm, status })}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${playerForm.status === status ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:bg-dark-600'}`}>{status}</button>
              ))}</div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" onClick={() => setPlayerModal(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleSavePlayer} loading={saving} className="flex-1">Save Player</Button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={roundModal} onClose={() => setRoundModal(false)} title={editingRound ? 'Edit Round' : 'Add Round'} size="md">
          <div className="space-y-4">
            <Input label="Round Name" value={roundForm.name} onChange={(e) => setRoundForm({ ...roundForm, name: e.target.value })} required />
            <Input label="Round Number" type="number" value={roundForm.round_number} onChange={(e) => setRoundForm({ ...roundForm, round_number: parseInt(e.target.value) || 1 })} min={1} required />
            <div><label className="block text-sm font-medium text-dark-200 mb-1.5">Stage</label>
              <div className="flex flex-wrap gap-2">{STAGES.map(stage => (
                <button key={stage} type="button" onClick={() => setRoundForm({ ...roundForm, stage })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${roundForm.stage === stage ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:bg-dark-600'}`}>{stage.replace('_', ' ')}</button>
              ))}</div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" onClick={() => setRoundModal(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleSaveRound} loading={saving} className="flex-1">Save Round</Button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={statsModal} onClose={() => setStatsModal(false)} title="Player Statistics" size="md">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-dark-200 mb-1.5">Round</label>
                <select value={selectedRoundForStats} onChange={(e) => setSelectedRoundForStats(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-xl text-white">
                  {rounds.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium text-dark-200 mb-1.5">Player</label>
                <select value={selectedPlayerForStats} onChange={(e) => setSelectedPlayerForStats(e.target.value)} className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-xl text-white">
                  {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{ key: 'win_match', label: 'Win Match' }, { key: 'man_of_the_match', label: 'MOTM' }, { key: 'clean_sheet', label: 'Clean Sheet' }, { key: 'penalty_save', label: 'Penalty Save' }].map(item => (
                <label key={item.key} className="flex items-center gap-3 p-3 bg-dark-700/50 rounded-xl cursor-pointer">
                  <input type="checkbox" checked={statsForm[item.key as keyof typeof statsForm] as boolean} onChange={(e) => setStatsForm({ ...statsForm, [item.key]: e.target.checked })} className="w-5 h-5 rounded border-dark-600 bg-dark-700 text-primary-500" />
                  <span className="text-white">{item.label}</span>
                </label>
              ))}
            </div>
            <label className="flex items-center gap-3 p-3 bg-red-500/10 rounded-xl border border-red-500/30 cursor-pointer">
              <input type="checkbox" checked={statsForm.red_card} onChange={(e) => setStatsForm({ ...statsForm, red_card: e.target.checked })} className="w-5 h-5 rounded border-red-500 bg-dark-700 text-red-500" />
              <span className="text-red-400">Red Card (Points = 0)</span>
            </label>
            <div className="grid grid-cols-3 gap-4">
              <Input label="Goals" type="number" min="0" value={statsForm.goals} onChange={(e) => setStatsForm({ ...statsForm, goals: parseInt(e.target.value) || 0 })} />
              <Input label="Assists" type="number" min="0" value={statsForm.assists} onChange={(e) => setStatsForm({ ...statsForm, assists: parseInt(e.target.value) || 0 })} />
              <Input label="Minutes" type="number" min="0" value={statsForm.played_minutes} onChange={(e) => setStatsForm({ ...statsForm, played_minutes: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" onClick={() => setStatsModal(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleSaveStats} loading={saving} className="flex-1">Save Statistics</Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}
