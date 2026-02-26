import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslations } from '@/translations';

export function useTranslation() {
  const { language } = useLanguage();
  const translations = useTranslations(language);
  
  return translations;
}