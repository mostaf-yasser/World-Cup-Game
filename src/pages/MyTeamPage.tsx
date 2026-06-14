import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { Layout } from '../components/Layout';
import { Card, CardBody, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { getFantasyTeamByUserId, getCurrentRound, getTeamPlayers, updateFantasyTeam } from '../services/database';
import type { FantasyTeam, Player, TeamPlayer, Round } from '../lib/supabase';
import { Trophy, Users, Shield, Zap, Edit, AlertCircle, Crown, Star, Loader2 } from 'lucide-react';

export function MyTeamPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<FantasyTeam | null>(null);
  const [players, setPlayers] = useState<(TeamPlayer & { player: Player })[]>([]);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [barakawyModal, setBarakawyModal] = useState(false);
  const [shala7Modal, setShala7Modal] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => { if (user) loadData(); }, [user]);

  const loadData = async () => {
    if (!user) return;
    try {
      const [teamData, roundData] = await Promise.all([getFantasyTeamByUserId(user.id), getCurrentRound()]);
      setTeam(teamData);
      setCurrentRound(roundData);
      if (teamData) setPlayers(await getTeamPlayers(teamData.id) as any);
    } finally { setLoading(false); }
  };

  const handleActivateBarakawy = async () => {
    if (!team || !currentRound) return;
    setProcessing(true);
    try { await updateFantasyTeam(team.id, { barakawy_used: true, barakawy_round: currentRound.id }); setBarakawyModal(false); loadData(); }
    finally { setProcessing(false); }
  };

  const handleActivateShala7 = async () => {
    if (!team) return;
    setProcessing(true);
    try { await updateFantasyTeam(team.id, { shala7_used: true }); setShala7Modal(false); navigate('/create-team'); }
    finally { setProcessing(false); }
  };

  if (loading) return <Layout><div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div></Layout>;
  if (!team) return <Layout><div className="text-center py-20"><Trophy className="w-12 h-12 text-dark-500 mx-auto mb-4" /><h2 className="font-display text-2xl font-bold mb-2">{t('myTeamNoTeam')}</h2><Button onClick={() => navigate('/create-team')}>{t('landingCreateTeam')}</Button></div></Layout>;

  const starters = players.filter(p => p.is_starter);
  const bench = players.filter(p => !p.is_starter);
  const canUseShala7 = (currentRound?.stage || 'group') !== 'group' && !team.shala7_used;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-dark-700 flex items-center justify-center"><Shield className="w-8 h-8 text-dark-400" /></div>
            <div><h1 className="font-display text-2xl md:text-3xl font-bold">{team.name}</h1><p className="text-dark-400">{t('createTeamManager')}: {team.manager_name}</p></div>
          </div>
          {!currentRound?.is_locked && <Button variant="outline" onClick={() => navigate('/create-team')} icon={<Edit className="w-4 h-4" />}>{t('myTeamEditTeam')}</Button>}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardBody className="text-center"><p className="text-3xl font-bold text-primary-400">{team.total_points}</p><p className="text-dark-400 text-sm">{t('dashboardTotalPoints')}</p></CardBody></Card>
          <Card><CardBody className="text-center"><p className="text-3xl font-bold text-white">{team.current_round_points}</p><p className="text-dark-400 text-sm">{t('dashboardRoundPoints')}</p></CardBody></Card>
          <Card className={team.barakawy_used ? 'opacity-60' : ''}><CardBody className="text-center"><Zap className={`w-6 h-6 mx-auto mb-1 ${team.barakawy_used ? 'text-dark-500' : 'text-gold-400'}`} /><p className={`text-sm ${team.barakawy_used ? 'text-dark-500' : 'text-gold-400'}`}>{t('dashboardBarakawy')} {team.barakawy_used ? t('dashboardUsed') : t('dashboardReady')}</p></CardBody></Card>
          <Card className={team.shala7_used ? 'opacity-60' : ''}><CardBody className="text-center"><Shield className={`w-6 h-6 mx-auto mb-1 ${team.shala7_used ? 'text-dark-500' : 'text-secondary-400'}`} /><p className={`text-sm ${team.shala7_used ? 'text-dark-500' : 'text-secondary-400'}`}>{t('dashboardShala7')} {team.shala7_used ? t('dashboardUsed') : t('dashboardReady')}</p></CardBody></Card>
        </div>

        <Card>
          <CardHeader><h2 className="font-display text-lg font-bold">{t('myTeamCardsTitle')}</h2></CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-dark-700/50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${team.barakawy_used ? 'bg-dark-600' : 'bg-gold-400/20'}`}><Zap className={`w-6 h-6 ${team.barakawy_used ? 'text-dark-500' : 'text-gold-400'}`} /></div>
                <div><p className="font-medium text-white">{t('barakawyTitle')}</p><p className="text-dark-400 text-sm">{team.barakawy_used ? t('myTeamBarakawyUsed') : t('myTeamBarakawyDesc')}</p></div>
              </div>
              {!team.barakawy_used && currentRound && !currentRound.is_locked && <Button size="sm" onClick={() => setBarakawyModal(true)}>{t('myTeamActivate')}</Button>}
            </div>
            <div className="flex items-center justify-between p-4 bg-dark-700/50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${team.shala7_used ? 'bg-dark-600' : 'bg-secondary-500/20'}`}><Shield className={`w-6 h-6 ${team.shala7_used ? 'text-dark-500' : 'text-secondary-400'}`} /></div>
                <div><p className="font-medium text-white">{t('shala7Title')}</p><p className="text-dark-400 text-sm">{team.shala7_used ? t('myTeamBarakawyUsed') : (currentRound?.stage || 'group') === 'group' ? t('myTeamShala7DescGroup') : t('myTeamShala7Desc')}</p></div>
              </div>
              {canUseShala7 && <Button size="sm" variant="secondary" onClick={() => setShala7Modal(true)}>{t('myTeamActivate')}</Button>}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><h2 className="font-display text-lg font-bold flex items-center gap-2"><Trophy className="w-5 h-5 text-primary-400" />{t('createTeamStartersTitle')}</h2></CardHeader>
          <CardBody>
            <div className="grid gap-4">
              {['FWD', 'MID', 'DEF', 'GK'].map(pos => {
                const posPlayers = starters.filter(p => p.player.position === pos);
                const posLabel = pos === 'GK' ? t('posGK') : pos === 'DEF' ? t('posDEF') : pos === 'MID' ? t('posMID') : t('posFWD');
                return <div key={pos}>
                  <p className="text-xs font-medium text-dark-500 uppercase mb-2">{posLabel} {pos === 'FWD' ? '(2)' : '(1)'}</p>
                  <div className={`grid ${pos === 'FWD' ? 'grid-cols-2' : 'grid-cols-1 max-w-xs'} gap-3`}>
                    {posPlayers.length > 0 ? posPlayers.map(tp => (
                      <div key={tp.id} className="bg-dark-700/50 rounded-xl p-3 border border-dark-600">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center"><Users className="w-5 h-5 text-dark-400" /></div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate flex items-center gap-2">
                              {tp.player.name}
                              {tp.player_id === team.captain_id && <Crown className="w-4 h-4 text-gold-400" />}
                              {tp.player_id === team.vice_captain_id && <Star className="w-4 h-4 text-dark-400" />}
                            </p>
                            <p className="text-dark-400 text-sm truncate">{tp.player.national_team}</p>
                          </div>
                        </div>
                        {tp.player_id === team.captain_id && <span className="mt-2 inline-block text-xs px-2 py-0.5 rounded bg-gold-400/20 text-gold-400">{t('createTeamCaptainDesc')}</span>}
                      </div>
                    )) : <div className="bg-dark-700/30 rounded-xl p-3 border border-dashed border-dark-500 text-center text-dark-500 text-sm">{t('createTeamNoPlayers')}</div>}
                  </div>
                </div>;
              })}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><h2 className="font-display text-lg font-bold text-dark-400">{t('createTeamBenchTitle')}</h2></CardHeader>
          <CardBody>
            <p className="text-dark-400 text-sm mb-4">{t('createTeamBenchDesc')}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['FWD', 'MID', 'DEF', 'GK'].map(pos => {
                const tp = bench.find(p => p.player.position === pos);
                const posLabel = pos === 'GK' ? t('posGK') : pos === 'DEF' ? t('posDEF') : pos === 'MID' ? t('posMID') : t('posFWD');
                return <div key={pos}>
                  <p className="text-xs font-medium text-dark-500 uppercase mb-1">{posLabel}</p>
                  {tp ? (
                    <div className="bg-dark-700/50 rounded-xl p-3 border border-dark-600"><p className="font-medium text-white text-sm truncate">{tp.player.name}</p></div>
                  ) : <div className="bg-dark-700/30 rounded-xl p-3 border border-dashed border-dark-500 text-center text-dark-500 text-sm">-</div>}
                </div>;
              })}
            </div>
          </CardBody>
        </Card>

        <Modal isOpen={barakawyModal} onClose={() => setBarakawyModal(false)} title={t('myTeamActivateBarakawy')} size="sm">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gold-400/10 rounded-xl"><Zap className="w-8 h-8 text-gold-400" /><div><p className="font-medium text-white">{t('barakawyTitle')}</p><p className="text-dark-400 text-sm">{t('myTeamBarakawyDesc')}</p></div></div>
            <div className="p-4 bg-dark-700/50 rounded-xl"><p className="text-dark-300 text-sm">{t('myTeamBarakawyModalDesc')}</p></div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setBarakawyModal(false)} className="flex-1">{t('createTeamCancel')}</Button>
              <Button onClick={handleActivateBarakawy} loading={processing} className="flex-1">{t('myTeamActivate')}</Button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={shala7Modal} onClose={() => setShala7Modal(false)} title={t('myTeamActivateShala7')} size="sm">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-secondary-500/10 rounded-xl"><Shield className="w-8 h-8 text-secondary-400" /><div><p className="font-medium text-white">{t('shala7Title')}</p><p className="text-dark-400 text-sm">{t('myTeamShala7Desc')}</p></div></div>
            <div className="flex items-center gap-2 p-4 bg-red-500/10 rounded-xl text-red-400"><AlertCircle className="w-5 h-5" /><span>{t('myTeamShala7Warning')}</span></div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShala7Modal(false)} className="flex-1">{t('createTeamCancel')}</Button>
              <Button variant="danger" onClick={handleActivateShala7} loading={processing} className="flex-1">{t('myTeamActivate')}</Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}
