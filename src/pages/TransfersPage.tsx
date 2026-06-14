import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { Layout } from '../components/Layout';
import { Card, CardBody, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { PlayerCard } from '../components/PlayerCard';
import { Modal } from '../components/Modal';
import { getFantasyTeamByUserId, getCurrentRound, createTransfer, addPlayerToTeam, removePlayerFromTeam, getTeamTransfersForRound, getPlayers, getTeamPlayers } from '../services/database';
import type { Player, FantasyTeam, Round } from '../lib/supabase';
import { ArrowLeftRight, AlertCircle, Check, Loader2 } from 'lucide-react';

export function TransfersPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [team, setTeam] = useState<FantasyTeam | null>(null);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [existingTransfers, setExistingTransfers] = useState<any[]>([]);
  const [players, setPlayers] = useState<(Player & { is_starter: boolean })[]>([]);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [playerOut, setPlayerOut] = useState<Player | null>(null);
  const [playerIn, setPlayerIn] = useState<Player | null>(null);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => { if (user) loadData(); }, [user]);

  const loadData = async () => {
    if (!user) return;
    try {
      const [teamData, roundData, allPlayersData] = await Promise.all([getFantasyTeamByUserId(user.id), getCurrentRound(), getPlayers()]);
      setTeam(teamData);
      setCurrentRound(roundData);
      setAllPlayers(allPlayersData);
      if (teamData) {
        const teamPlayers = await getTeamPlayers(teamData.id);
        setPlayers(teamPlayers.map(tp => ({ ...tp.player, is_starter: tp.is_starter })));
        if (roundData) setExistingTransfers(await getTeamTransfersForRound(teamData.id, roundData.id));
      }
    } finally { setLoading(false); }
  };

  const canMakeTransfer = () => {
    if (!currentRound || !currentRound.transfers_open || currentRound.is_locked || existingTransfers.length >= 1) return false;
    return true;
  };

  const getAvailablePlayers = () => {
    const currentIds = players.map(p => p.id);
    return allPlayers.filter(p => !currentIds.includes(p.id) && (!playerOut || p.position === playerOut.position));
  };

  const handleOpenTransferModal = (outPlayer: Player) => {
    if (!canMakeTransfer()) return;
    setPlayerOut(outPlayer);
    setPlayerIn(null);
    setTransferModalOpen(true);
  };

  const validateNationalTeamLimit = (incomingPlayer: Player): boolean => {
    if (!currentRound || currentRound.stage !== 'group') return true;
    const currentCount = players.filter(p => p.national_team === incomingPlayer.national_team).length;
    if (playerOut?.national_team === incomingPlayer.national_team) return true;
    return currentCount < 2;
  };

  const handleConfirmTransfer = async () => {
    if (!team || !currentRound || !playerOut || !playerIn) return;
    if (!validateNationalTeamLimit(playerIn)) { alert(t('errorTransferLimitTeam', { team: playerIn.national_team })); return; }
    setSaving(true);
    try {
      await createTransfer({ team_id: team.id, round_id: currentRound.id, player_out_id: playerOut.id, player_in_id: playerIn.id });
      await removePlayerFromTeam(team.id, playerOut.id);
      await addPlayerToTeam(team.id, playerIn.id, playerOut.is_starter);
      setSuccess(`${t('transfersSuccess')} ${playerOut.name} ${t('transfersOut')}, ${playerIn.name} ${t('transfersIn')}.`);
      setTransferModalOpen(false);
      loadData();
    } finally { setSaving(false); }
  };

  if (loading) return <Layout><div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div></Layout>;
  if (!team) return <Layout><div className="text-center py-20"><ArrowLeftRight className="w-12 h-12 text-dark-500 mx-auto mb-4" /><h2 className="font-display text-2xl font-bold mb-2">{t('myTeamNoTeam')}</h2></div></Layout>;

  const canTransfer = canMakeTransfer();
  const starters = players.filter(p => p.is_starter);
  const bench = players.filter(p => !p.is_starter);

  const getTransferStatus = () => {
    if (!canTransfer) {
      if (existingTransfers.length >= 1) return t('transfersUsed');
      if (currentRound?.is_locked) return t('transfersLocked');
      return t('transfersClosed');
    }
    return t('transfersAvailable');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div><h1 className="font-display text-2xl md:text-3xl font-bold">{t('transfersTitle')}</h1><p className="text-dark-400 mt-1">{currentRound ? currentRound.name : t('dashboardNoRound')}</p></div>

        <Card className={canTransfer ? 'border-secondary-500/30' : ''}>
          <CardBody>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${canTransfer ? 'bg-secondary-500/20' : 'bg-dark-700'}`}>
                  <ArrowLeftRight className={`w-6 h-6 ${canTransfer ? 'text-secondary-400' : 'text-dark-500'}`} />
                </div>
                <div>
                  <p className="font-medium text-white">{t('transfersStatus')}</p>
                  <p className={`text-sm ${canTransfer ? 'text-secondary-400' : 'text-dark-400'}`}>{getTransferStatus()}</p>
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${canTransfer ? 'bg-secondary-500/20 text-secondary-400' : 'bg-dark-700 text-dark-400'}`}>{existingTransfers.length}/1</div>
            </div>
          </CardBody>
        </Card>

        {success && <div className="flex items-center gap-2 p-4 bg-secondary-500/10 border border-secondary-500/30 rounded-xl text-secondary-400"><Check className="w-5 h-5" />{success}</div>}

        <Card>
          <CardBody>
            <div className="flex items-start gap-3 text-dark-300 text-sm">
              <AlertCircle className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
              <div>{t('transfersInstructions')}</div>
            </div>
          </CardBody>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {[
            { label: t('createTeamStartersTitle'), data: starters },
            { label: t('createTeamBenchTitle'), data: bench }
          ].map(section => (
            <Card key={section.label}>
              <CardHeader><h2 className="font-display text-lg font-bold">{section.label}</h2></CardHeader>
              <CardBody className="space-y-3">
                {section.data.map(player => (
                  <div key={player.id} onClick={() => handleOpenTransferModal(player)} className={`relative ${canTransfer ? 'cursor-pointer hover:border-primary-500/30' : 'opacity-60'}`}>
                    <PlayerCard player={player} compact />
                  </div>
                ))}
              </CardBody>
            </Card>
          ))}
        </div>

        <Modal isOpen={transferModalOpen} onClose={() => setTransferModalOpen(false)} title={t('transfersConfirm')} size="xl">
          <div className="space-y-6">
            <div><label className="text-sm font-medium text-dark-300 mb-2 block">{t('transfersPlayerOut')}</label>{playerOut && <PlayerCard player={playerOut} compact />}</div>
            <div>
              <label className="text-sm font-medium text-dark-300 mb-2 block">{t('transfersPlayerIn')}</label>
              <div className="max-h-[40vh] overflow-y-auto space-y-2">
                {getAvailablePlayers().length === 0 ? <p className="text-dark-400 text-center py-4">{t('transfersNoPlayers')}</p> :
                  getAvailablePlayers().map(player => (
                    <div key={player.id} onClick={() => setPlayerIn(player)} className={`cursor-pointer rounded-xl ${playerIn?.id === player.id ? 'ring-2 ring-primary-500' : ''}`}>
                      <PlayerCard player={player} compact selected={playerIn?.id === player.id} />
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setTransferModalOpen(false)} className="flex-1">{t('createTeamCancel')}</Button>
              <Button onClick={handleConfirmTransfer} disabled={!playerIn} loading={saving} className="flex-1">{t('transfersConfirm')}</Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}
