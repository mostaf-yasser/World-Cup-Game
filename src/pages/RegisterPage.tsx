import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageToggle } from '../components/LanguageToggle';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (user) { navigate('/dashboard'); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) { setError(t('errorPasswordsMatch')); return; }
    if (password.length < 6) { setError(t('errorPasswordLength')); return; }
    setLoading(true);
    try {
      const { error: signUpError } = await signUp(email, password, displayName || undefined);
      if (signUpError) setError(signUpError.message);
      else { setSuccess(true); setTimeout(() => navigate('/create-team'), 2000); }
    } finally { setLoading(false); }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-world-cup flex items-center justify-center p-4">
        <div className="bg-dark-800/80 rounded-2xl border border-dark-700/50 shadow-card p-8 text-center max-w-md w-full">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">{t('registerSuccess')}</h2>
          <p className="text-dark-400">{t('registerSuccessDesc')}</p>
        </div>
      </div>
    );
  }

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
          <h2 className="font-display text-2xl font-bold text-center mb-2">{t('registerTitle')}</h2>
          <p className="text-dark-400 text-center mb-8">{t('registerSubtitle')}</p>
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm mb-6">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <Input placeholder={t('registerDisplayName')} value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="ps-12" />
            </div>
            <div className="relative">
              <Mail className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <Input type="email" placeholder={t('loginEmail')} value={email} onChange={(e) => setEmail(e.target.value)} className="ps-12" required />
            </div>
            <div className="relative">
              <Lock className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <Input type="password" placeholder={t('registerPassword')} value={password} onChange={(e) => setPassword(e.target.value)} className="ps-12" required />
            </div>
            <div className="relative">
              <Lock className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <Input type="password" placeholder={t('registerConfirmPassword')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="ps-12" required />
            </div>
            <Button type="submit" loading={loading} className="w-full" size="lg">{t('registerButton')}</Button>
          </form>
          <p className="mt-6 text-center text-dark-400 text-sm">
            {t('registerHasAccount')} <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">{t('registerSignIn')}</Link>
          </p>
        </div>
        <Link to="/" className="block mt-6 text-center text-dark-400 hover:text-white text-sm transition-colors">{t('loginBackHome')}</Link>
      </div>
    </div>
  );
}
