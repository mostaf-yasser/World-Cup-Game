import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageToggle } from '../components/LanguageToggle';
import { Trophy, Users, BarChart3, Zap, ArrowRight, Shield, Star } from 'lucide-react';

export function LandingPage() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const features = [
    { icon: Users, title: t('landingFeature1Title'), description: t('landingFeature1Desc') },
    { icon: ArrowRight, title: t('landingFeature2Title'), description: t('landingFeature2Desc') },
    { icon: BarChart3, title: t('landingFeature3Title'), description: t('landingFeature3Desc') },
    { icon: Zap, title: t('landingFeature4Title'), description: t('landingFeature4Desc') },
  ];

  const points = [
    { label: t('pointWinMatch'), points: '+1', color: 'bg-green-500' },
    { label: t('pointGoal'), points: '+1', color: 'bg-primary-500' },
    { label: t('pointAssist'), points: '+1', color: 'bg-blue-500' },
    { label: t('pointMOTM'), points: '+1', color: 'bg-yellow-500' },
    { label: t('pointPenaltySave'), points: '+1', color: 'bg-cyan-500' },
    { label: t('pointCleanSheet'), points: '+1', color: 'bg-purple-500' },
    { label: t('pointCaptain'), points: 'x2', color: 'bg-gold-400' },
    { label: t('pointRedCard'), points: '0', color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-world-cup text-white">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg text-2xl">⚽</div>
          <span className="font-display font-bold text-2xl">{t('appName')}</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Link to="/login" className="px-4 py-2 text-dark-200 hover:text-white transition-colors">{t('navSignIn')}</Link>
          <Link to="/register" className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 rounded-xl font-semibold transition-all">{t('navGetStarted')}</Link>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 text-center py-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800/50 rounded-full border border-dark-600 mb-8">
          <Trophy className="w-4 h-4 text-primary-400" />
          <span className="text-sm text-dark-200">{t('landingSubtitle')}</span>
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {t('landingHeroTitle1')}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">{t('landingHeroTitle2')}</span>
        </h1>
        <p className="text-xl text-dark-300 mb-10 max-w-2xl mx-auto">{t('landingHeroDesc')}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={user ? '/dashboard' : '/register'} className="px-8 py-4 bg-primary-500 hover:bg-primary-600 rounded-xl font-semibold text-lg transition-all flex items-center gap-2">
            {user ? t('navDashboard') : t('landingCreateTeam')} <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/leaderboard" className="px-8 py-4 bg-dark-700 hover:bg-dark-600 rounded-xl font-semibold text-lg border border-dark-600">{t('landingViewLeaderboard')}</Link>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-20 border-t border-dark-700/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{t('landingHowItWorks')}</h2>
          <p className="text-dark-300 text-lg">{t('landingHowItWorksSubtitle')}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700/50 hover:border-primary-500/30 transition-all group">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500/30">
                <f.icon className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-dark-400 text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Points System */}
      <div className="max-w-7xl mx-auto px-4 py-20 border-t border-dark-700/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{t('landingPointsTitle')}</h2>
          <p className="text-dark-300 text-lg">{t('landingPointsSubtitle')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {points.map((p, i) => (
            <div key={i} className="flex items-center justify-between bg-dark-800/50 rounded-xl p-4 border border-dark-700/50">
              <span className="text-dark-200">{p.label}</span>
              <span className={`px-3 py-1 ${p.color} rounded-lg font-bold text-sm text-white`}>{p.points}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Special Cards */}
      <div className="max-w-7xl mx-auto px-4 py-20 bg-dark-800/30 border-t border-dark-700/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{t('landingCardsTitle')}</h2>
          <p className="text-dark-300 text-lg">{t('landingCardsSubtitle')}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-2xl p-8 border border-primary-500/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center"><Zap className="w-7 h-7 text-white" /></div>
              <div><h3 className="font-display text-2xl font-bold">{t('barakawyTitle')}</h3><span className="text-primary-400 text-sm">{t('barakawySubtitle')}</span></div>
            </div>
            <p className="text-dark-300 mb-4">{t('barakawyDesc')}</p>
            <div className="flex items-center gap-2 text-sm text-dark-400"><Star className="w-4 h-4 text-primary-400" /><span>{t('barakawyTip')}</span></div>
          </div>
          <div className="bg-gradient-to-br from-secondary-500/20 to-secondary-600/10 rounded-2xl p-8 border border-secondary-500/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-secondary-500 rounded-xl flex items-center justify-center"><Shield className="w-7 h-7 text-white" /></div>
              <div><h3 className="font-display text-2xl font-bold">{t('shala7Title')}</h3><span className="text-secondary-400 text-sm">{t('shala7Subtitle')}</span></div>
            </div>
            <p className="text-dark-300 mb-4">{t('shala7Desc')}</p>
            <div className="flex items-center gap-2 text-sm text-dark-400"><Star className="w-4 h-4 text-secondary-400" /><span>{t('shala7Tip')}</span></div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-4xl font-bold mb-4">{t('landingCTATitle')}</h2>
        <p className="text-dark-300 text-lg mb-8">{t('landingCTADesc')}</p>
        <Link to={user ? '/dashboard' : '/register'} className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 rounded-xl font-semibold text-lg transition-all">
          {user ? t('navDashboard') : t('landingCTAButton')} <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Footer */}
      <footer className="border-t border-dark-700/50 bg-dark-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-dark-400 text-sm">
          <span className="text-xl">⚽ {t('appName')} 2026</span>
          <span>{t('footerTagline1')}. {t('footerTagline2')}.</span>
        </div>
      </footer>
    </div>
  );
}
