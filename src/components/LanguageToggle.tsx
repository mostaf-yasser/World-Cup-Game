import { useLanguage } from '../i18n/LanguageContext';
import { Languages } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-700/50 hover:bg-dark-600 text-sm font-medium transition-colors"
      title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <Languages className="w-4 h-4" />
      <span className="hidden sm:inline">{language === 'en' ? 'عربي' : 'English'}</span>
      <span className="sm:hidden">{language === 'en' ? 'AR' : 'EN'}</span>
    </button>
  );
}
