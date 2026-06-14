import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageToggle } from '../components/LanguageToggle';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (user) { navigate('/dashboard'); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) setError(signInError.message);
      else navigate('/dashboard');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-world-cup flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg text-3xl">⚽</div>
            <span className="font-display font-bold text-2xl">{t('appName')}</span>
          </Link>
          <LanguageToggle />
        </div>
        <div className="bg-dark-800/80 backdrop-blur-xl rounded-2xl border border-dark-700/50 shadow-card p-8">
          <h2 className="font-display text-2xl font-bold text-center mb-2">{t('loginTitle')}</h2>
          <p className="text-dark-400 text-center mb-8">{t('loginSubtitle')}</p>
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm mb-6">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <Input type="email" placeholder={t('loginEmail')} value={email} onChange={(e) => setEmail(e.target.value)} className="ps-12" required />
            </div>
            <div className="relative">
              <Lock className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <Input type="password" placeholder={t('loginPassword')} value={password} onChange={(e) => setPassword(e.target.value)} className="ps-12" required />
            </div>
            <Button type="submit" loading={loading} className="w-full" size="lg">{t('loginButton')}</Button>
          </form>
          <p className="mt-6 text-center text-dark-400 text-sm">
            {t('loginNoAccount')} <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">{t('loginCreateOne')}</Link>
          </p>
        </div>
        <Link to="/" className="block mt-6 text-center text-dark-400 hover:text-white text-sm transition-colors">{t('loginBackHome')}</Link>
      </div>
    </div>
  );
}
