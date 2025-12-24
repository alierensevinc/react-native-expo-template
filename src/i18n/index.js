import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import tr from './locales/tr.json';

// Dil kaynaklarını tanımla
const resources = {
  en: {
    translation: en,
  },
  tr: {
    translation: tr,
  },
};

// Cihazın dilini al
const getDeviceLanguage = () => {
  // Expo Localization API'si biraz değişti, güvenli bir şekilde ilk dili alalım
  const locales = Localization.getLocales();
  if (locales && locales.length > 0) {
    return locales[0].languageCode;
  }
  return 'en';
};

i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(), // Cihaz dilini varsayılan olarak ayarla
  fallbackLng: 'en', // Dil bulunamazsa İngilizceye dön
  interpolation: {
    escapeValue: false, // React zaten XSS koruması sağlıyor
  },
  compatibilityJSON: 'v3', // Android için gerekli
});

export default i18n;
