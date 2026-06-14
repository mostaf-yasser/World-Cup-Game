import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Layout } from '../components/Layout';
import { Card, CardBody } from '../components/Card';
import { getRounds, getPlayerStats } from '../services/database';
import type { Round, PlayerStats, Player } from '../lib/supabase';
import { BarChart3, Trophy, CheckCircle, Users, Lock, Unlock, Clock, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

interface StatsWithPlayer extends PlayerStats { player: Player; }

export function RoundsPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [expandedRound, setExpandedRound] = useState<string | null>(null);
  const [roundStats, setRoundStats] = useState<Map<string, StatsWithPlayer[]>>(new Map());

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try { setRounds(await getRounds()); } finally { setLoading(false); }
  };

  const loadRoundStats = async (roundId: string) => {
    if (roundStats.has(roundId)) return;
    try {
      const stats = await getPlayerStats(roundId);
      setRoundStats(prev => new Map(prev).set(roundId, stats as StatsWithPlayer[]));
    } catch (err) { console.error(err); }
  };

  const handleToggleRound = (roundId: string) => {
    if (expandedRound === roundId) setExpandedRound(null);
    else { setExpandedRound(roundId); loadRoundStats(roundId); }
  };

  const getStageLabel = (stage: string) => {
    const labels: Record<string, string> = {
      group: t('stageGroup'),
      round_of_32: t('stageRoundOf32'),
      round_of_16: t('stageRoundOf16'),
      quarter_final: t('stageQuarterFinal'),
      semi_final: t('stageSemiFinal'),
      third_place: t('stageThirdPlace'),
      final: t('stageFinal'),
    };
    return labels[stage] || stage;
  };

  if (loading) return <Layout><div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <div><h1 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-3"><BarChart3 className="w-8 h-8 text-primary-400" />{t('roundsTitle')}</h1><p className="text-dark-400 mt-1">{t('roundsSubtitle')}</p></div>

        {rounds.length === 0 ? (
          <Card className="text-center py-12">
            <CardBody>
              <BarChart3 className="w-12 h-12 text-dark-500 mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold mb-2">{t('roundsNoRounds')}</h2>
              <p className="text-dark-400">{t('roundsNoRoundsDesc')}</p>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-4">
            {rounds.map(round => {
              const stats = roundStats.get(round.id) || [];
              const isExpanded = expandedRound === round.id;
              return (
                <Card key={round.id} className={isExpanded ? 'border-primary-500/30' : ''}>
                  <div className="flex items-center justify-between px-6 py-4 cursor-pointer" onClick={() => handleToggleRound(round.id)}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center"><span className="text-2xl font-bold text-primary-400">{round.round_number}</span></div>
                      <div>
                        <p className="font-semibold text-white">{round.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 rounded text-xs bg-dark-600 text-dark-200">{getStageLabel(round.stage)}</span>
                          {round.is_finished ? <><CheckCircle className="w-4 h-4 text-secondary-400" /><span className="text-xs text-secondary-400">{t('roundsFinished')}</span></> :
                           round.is_locked ? <><Lock className="w-4 h-4 text-red-400" /><span className="text-xs text-red-400">{t('roundsLocked')}</span></> :
                           round.transfers_open ? <><Unlock className="w-4 h-4 text-primary-400" /><span className="text-xs text-primary-400">{t('roundsTransfersOpen')}</span></> :
                           <><Clock className="w-4 h-4 text-dark-400" /><span className="text-xs text-dark-400">{t('roundsUpcoming')}</span></>}
                        </div>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-dark-400" /> : <ChevronDown className="w-5 h-5 text-dark-400" />}
                  </div>
                  {isExpanded && (
                    <CardBody>
                      {stats.length === 0 ? <div className="text-center py-8"><BarChart3 className="w-12 h-12 text-dark-500 mx-auto mb-3" /><p className="text-dark-400">{round.is_finished ? t('roundsNoStats') : t('roundsNoStatsYet')}</p></div> :
                      <div className="space-y-4">
                        <div><h3 className="font-semibold text-white mb-3">{t('roundsTopPerformers')}</h3>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {stats.sort((a, b) => b.fantasy_points - a.fantasy_points).slice(0, 6).map(stat => (
                              <div key={stat.id} className="flex items-center gap-3 p-3 bg-dark-700/50 rounded-xl">
                                <div className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center"><Users className="w-5 h-5 text-dark-400" /></div>
                                <div className="flex-1 min-w-0"><p className="font-medium text-white text-sm truncate">{stat.player.name}</p><p className="text-dark-400 text-xs truncate">{stat.player.national_team}</p></div>
                                <div className="text-right"><p className="font-bold text-primary-400">{stat.fantasy_points}</p><p className="text-dark-500 text-xs">{t('dashboardPoints')}</p></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>}
                    </CardBody>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
