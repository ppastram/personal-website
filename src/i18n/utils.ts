import en from './en.json';
import es from './es.json';

const translations = { en, es } as const;

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof en;

export function useTranslations(lang: Locale) {
  return function t(key: TranslationKey): string {
    return translations[lang][key] || translations.en[key] || key;
  };
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang === 'es') return 'es';
  return 'en';
}

export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove any existing locale prefix
  const cleanPath = path.replace(/^\/(en|es)/, '');
  return `/${locale}${cleanPath || '/'}`;
}
