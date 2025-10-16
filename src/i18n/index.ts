import { createI18n } from 'vue-i18n';
import fr from './locales/fr.json';
import en from './locales/en.json';
import zh from './locales/zh.json';

const messages = {
  fr,
  en,
  zh
};

export const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'en',
  messages
});

export default i18n;