import { createI18n } from "vue-i18n";
import en from "./en";
import zh from "./zh";
const message = {
  en,
  zh,
};
const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages: message,
});

export default i18n;
