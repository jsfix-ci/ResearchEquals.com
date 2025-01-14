import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "../../langs/en.json"

i18n.use(initReactI18next).init({
  resources: {
    en,
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
})
