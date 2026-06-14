import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { Layout } from '../components/Layout';
import { Card, CardBody } from '../components/Card';
import { Button } from '../components/Button';
import { getFantasyTeamByUserId, getCurrentRound, getLeaderboard, getTeamPlayers } from '../services/database';
import type { FantasyTeam, Round } from '../lib/supabase';
import { Trophy, Users, ArrowRight, BarChart3, Zap, Shield, Target, TrendingUp, Loader2 } from 'lucide-react';

interface LeaderboardEntry extends FantasyTeam { user: { display_name: string | null; email: string }; }

export function DashboardPage() {
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<FantasyTeam | null>(null);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [teamRank, setTeamRank] = useState<number | null>(null);

  useEffect(() => { if (user) loadData(); }, [user]);

  const loadData = async () => {
    if (!user) return;
    try {
      const [teamData, roundData, leaderboardData] = await Promise.all([
        getFantasyTeamByUserId(user.id),
        getCurrentRound(),
        getLeaderboard(),
      ]);
      setTeam(teamData);
      setCurrentRound(roundData);
      setLeaderboard(leaderboardData);
      if (teamData) {
        const rank = leaderboardData.findIndex(t => t.id === teamData.id) + 1;
        setTeamRank(rank || null);
      }
    } finally { setLoading(false); }
  };

  const getRoundStatus = () => {
    if (!currentRound) return t('dashboardNoRound');
    if (currentRound.transfers_open) return t('dashboardTransfersOpen');
    if (currentRound.is_locked) return t('dashboardRoundLocked');
    return t('dashboardComingSoon');
  };

  if (loading) return <Layout><div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">{t('dashboardWelcome')}, {profile?.display_name || 'Manager'}!</h1>
            <p className="text-dark-400 mt-1">{currentRound ? `${currentRound.name} - ${getRoundStatus()}` : t('dashboardNoRound')}</p>
          </div>
          {!team && <Button onClick={() => navigate('/create-team')} icon={<ArrowRight className="w-4 h-4" />}>{t('landingCreateTeam')}</Button>}
        </div>

        {!team && (
          <Card className="text-center py-12">
            <CardBody>
              <div className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><Trophy className="w-10 h-10 text-primary-400" /></div>
              <h2 className="font-display text-2xl font-bold mb-2">{t('dashboardCreateTeamTitle')}</h2>
              <p className="text-dark-400 mb-6 max-w-md mx-auto">{t('dashboardCreateTeamDesc')}</p>
              <Button onClick={() => navigate('/create-team')} size="lg">{t('dashboardGetStarted')}</Button>
            </CardBody>
          </Card>
        )}

        {team && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-primary-500/20 to-primary-600/10 border-primary-500/30">
                <CardBody className="text-center">
                  <Trophy className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                  <p className="text-dark-400 text-sm">{t('dashboardTotalPoints')}</p>
                  <p className="text-3xl font-bold text-white mt-1">{team.total_points}</p>
                  {teamRank && <p className="text-primary-400 text-sm mt-1">{t('dashboardRank')} #{teamRank}</p>}
                </CardBody>
              </Card>
              <Card>
                <CardBody className="text-center">
                  <BarChart3 className="w-8 h-8 text-secondary-400 mx-auto mb-2" />
                  <p className="text-dark-400 text-sm">{t('dashboardRoundPoints')}</p>
                  <p className="text-3xl font-bold text-white mt-1">{team.current_round_points}</p>
                </CardBody>
              </Card>
              <Card className={team.barakawy_used ? 'opacity-60' : ''}>
                <CardBody className="text-center">
                  <Zap className={`w-8 h-8 mx-auto mb-2 ${team.barakawy_used ? 'text-dark-500' : 'text-gold-400'}`} />
                  <p className={`text-sm font-medium ${team.barakawy_used ? 'text-dark-500' : 'text-gold-400'}`}>{t('dashboardBarakawy')} {team.barakawy_used ? t('dashboardUsed') : t('dashboardReady')}</p>
                </CardBody>
              </Card>
              <Card className={team.shala7_used ? 'opacity-60' : ''}>
                <CardBody className="text-center">
                  <Shield className={`w-8 h-8 mx-auto mb-2 ${team.shala7_used ? 'text-dark-500' : 'text-secondary-400'}`} />
                  <p className={`text-sm font-medium ${team.shala7_used ? 'text-dark-500' : 'text-secondary-400'}`}>{t('dashboardShala7')} {team.shala7_used ? t('dashboardUsed') : t('dashboardReady')}</p>
                </CardBody>
              </Card>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Users, label: t('dashboardQuickMyTeam'), desc: t('dashboardQuickMyTeamDesc'), path: '/my-team' },
                { icon: Target, label: t('dashboardQuickTransfers'), desc: currentRound?.transfers_open ? t('dashboardQuickTransfersDesc') : t('dashboardQuickTransfersClosed'), path: '/transfers' },
                { icon: Trophy, label: t('dashboardQuickLeaderboard'), desc: t('dashboardQuickLeaderboardDesc'), path: '/leaderboard', iconColor: 'text-gold-400' },
                { icon: TrendingUp, label: t('dashboardQuickRounds'), desc: t('dashboardQuickRoundsDesc'), path: '/rounds', iconColor: 'text-blue-400' }
              ].map((item, i) => (
                <Card key={i} className="hover:border-primary-500/30 transition-colors cursor-pointer" onClick={() => navigate(item.path)}>
                  <CardBody>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center`}>
                        <item.icon className={`w-5 h-5 ${item.iconColor || 'text-primary-400'}`} />
                      </div>
                      <div><p className="font-medium text-white">{item.label}</p><p className="text-dark-400 text-sm">{item.desc}</p></div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </>
        )}

        {leaderboard.length > 0 && (
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold flex items-center gap-2"><Trophy className="w-5 h-5 text-gold-400" />{t('dashboardLeaderboardTitle')}</h2>
                <span className="text-dark-400 text-sm">{leaderboard.length} {t('dashboardTeamsCompeting')}</span>
              </div>
              <div className="space-y-2">
                {leaderboard.slice(0, 5).map((entry, index) => (
                  <div key={entry.id} className={`flex items-center gap-4 p-3 rounded-xl ${entry.id === team?.id ? 'bg-primary-500/10 border border-primary-500/30' : 'bg-dark-700/30'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-gold-400 text-dark-900' : index === 1 ? 'bg-silver-400 text-dark-900' : index === 2 ? 'bg-bronze-400 text-white' : 'bg-dark-600 text-dark-300'
                    }`}>{index + 1}</div>
                    <div className="w-8 h-8 rounded-lg bg-dark-600 flex items-center justify-center"><Users className="w-4 h-4 text-dark-400" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{entry.name}</p>
                      <p className="text-dark-400 text-xs truncate">{entry.manager_name}</p>
                    </div>
                    <div className="text-right"><p className="font-bold text-white">{entry.total_points}</p><p className="text-dark-500 text-xs">{t('dashboardPoints')}</p></div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </Layout>
  );
}
