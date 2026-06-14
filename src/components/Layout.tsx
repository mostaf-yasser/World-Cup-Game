import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { Home, Users, ArrowLeftRight, Trophy, BarChart3, Shield, Menu, X, LogOut, User } from 'lucide-react';

interface LayoutProps { children: ReactNode; }

export function Layout({ children }: LayoutProps) {
  const { profile, signOut } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => { await signOut(); navigate('/'); };

  const navItems = [
    { path: '/dashboard', label: t('navDashboard'), icon: Home },
    { path: '/my-team', label: t('navMyTeam'), icon: Users },
    { path: '/transfers', label: t('navTransfers'), icon: ArrowLeftRight },
    { path: '/leaderboard', label: t('navLeaderboard'), icon: Trophy },
    { path: '/rounds', label: t('navRounds'), icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-world-cup text-white">
      <header className="sticky top-0 z-40 bg-dark-900/90 backdrop-blur-xl border-b border-dark-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg text-xl">⚽</div>
              <span className="font-display font-bold text-xl hidden sm:block">{t('appName')}</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === item.path ? 'bg-primary-500/20 text-primary-400' : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                  }`}>
                  <item.icon className="w-4 h-4" />{item.label}
                </Link>
              ))}
              {profile?.is_admin && (
                <Link to="/admin"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    location.pathname.startsWith('/admin') ? 'bg-red-500/20 text-red-400' : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                  }`}>
                  <Shield className="w-4 h-4" />{t('navAdmin')}
                </Link>
              )}
            </nav>
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center"><User className="w-4 h-4 text-dark-300" /></div>
                <span className="text-sm font-medium text-dark-200">{profile?.display_name || profile?.email?.split('@')[0]}</span>
              </div>
              <button onClick={handleSignOut} className="p-2 text-dark-400 hover:text-white hover:bg-dark-700/50 rounded-xl transition-colors" title={t('navSignOut')}>
                <LogOut className="w-5 h-5" />
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-dark-400 hover:text-white hover:bg-dark-700/50 rounded-xl transition-colors">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-dark-700/50 bg-dark-800/95">
            <nav className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === item.path ? 'bg-primary-500/20 text-primary-400' : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                  }`}>
                  <item.icon className="w-5 h-5" />{item.label}
                </Link>
              ))}
              {profile?.is_admin && (
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname.startsWith('/admin') ? 'bg-red-500/20 text-red-400' : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                  }`}>
                  <Shield className="w-5 h-5" />{t('navAdmin')}
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>
      <footer className="border-t border-dark-700/50 bg-dark-900/50 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-dark-400 text-sm"><span className="text-xl">⚽</span><span>{t('appName')} 2026</span></div>
          <div className="flex items-center gap-6 text-sm text-dark-400"><span>{t('footerTagline1')}</span><span>{t('footerTagline2')}</span></div>
        </div>
      </footer>
    </div>
  );
}
