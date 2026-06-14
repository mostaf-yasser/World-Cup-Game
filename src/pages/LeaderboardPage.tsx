import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { Layout } from '../components/Layout';
import { Card, CardBody } from '../components/Card';
import { Input } from '../components/Input';
import { getLeaderboard, getFantasyTeamByUserId } from '../services/database';
import type { FantasyTeam } from '../lib/supabase';
import { Trophy, Users, Search, Medal, Crown, Loader2 } from 'lucide-react';

interface LeaderboardEntry extends FantasyTeam { user: { display_name: string | null; email: string }; }

export function LeaderboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userTeamId, setUserTeamId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { loadData(); }, [user]);

  const loadData = async () => {
    try {
      const [leaderboardData, teamData] = await Promise.all([getLeaderboard(), user ? getFantasyTeamByUserId(user.id) : null]);
      setLeaderboard(leaderboardData);
      setUserTeamId(teamData?.id || null);
    } finally { setLoading(false); }
  };

  const filteredLeaderboard = leaderboard.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.manager_name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) return <Layout><div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <div><h1 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-3"><Trophy className="w-8 h-8 text-gold-400" />{t('leaderboardTitle')}</h1><p className="text-dark-400 mt-1">{leaderboard.length} {t('dashboardTeamsCompeting')}</p></div>

        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-3 gap-4">
            {[1, 0, 2].map((idx, i) => {
              const entry = leaderboard[idx === 1 ? 0 : idx === 0 ? 1 : 2];
              if (!entry) return null;
              return (
                <div key={i} className={`order-${idx === 0 ? 1 : idx === 1 ? 2 : 3} ${idx === 0 ? 'self-end' : ''}`}>
                  <Card className={`text-center ${i === 1 ? 'border-gold-400/30 bg-gradient-to-br from-gold-400/5 to-gold-400/10' : ''}`}>
                    <CardBody className={`py-${i === 1 ? '6' : '4'}`}>
                      {i === 1 && <Crown className="w-8 h-8 text-gold-400 mx-auto mb-2" />}
                      {i !== 1 && <Medal className={`w-6 h-6 ${i === 0 ? 'text-silver-400' : 'text-bronze-400'} mx-auto mb-2`} />}
                      <p className="font-semibold text-white truncate">{entry.name}</p>
                      <p className="text-dark-400 text-sm truncate">{entry.manager_name}</p>
                      <p className={`font-bold ${i === 1 ? 'text-3xl text-gold-400' : 'text-2xl text-white'} mt-2`}>{entry.total_points}</p>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </div>
        )}

        <div className="relative">
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
          <Input placeholder={t('leaderboardSearch')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="ps-12" />
        </div>

        <Card>
          <CardBody className="p-0">
            <div className="divide-y divide-dark-700/50">
              {filteredLeaderboard.map((entry, index) => (
                <div key={entry.id} className={`flex items-center gap-4 p-4 ${entry.id === userTeamId ? 'bg-primary-500/10' : ''}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-gold-400 text-dark-900' : index === 1 ? 'bg-silver-400 text-dark-900' : index === 2 ? 'bg-bronze-400 text-white' : 'bg-dark-600 text-dark-300'
                  }`}>{index + 1}</div>
                  <div className="w-12 h-12 rounded-xl bg-dark-600 flex items-center justify-center"><Users className="w-6 h-6 text-dark-400" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{entry.name}</p>
                    <p className="text-dark-400 text-sm truncate">{entry.manager_name}</p>
                  </div>
                  <div className="text-right"><p className="font-bold text-white text-lg">{entry.total_points}</p><p className="text-dark-500 text-xs">{t('dashboardPoints')}</p></div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}
