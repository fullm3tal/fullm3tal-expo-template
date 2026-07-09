import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Your translation files
import en from "./en/messages.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
