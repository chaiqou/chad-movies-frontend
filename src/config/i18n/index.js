import { createI18n } from "vue-i18n/index";
import en from "@/config/i18n/en.json";
import ka from "@/config/i18n/ka.json";

const i18n = createI18n({
  locale: localStorage.getItem("language") || "ka",
  legacy: false,
  globalInjection: true,
  messages: {
    english: en,
    georgian: ka,
  },
});

export default i18n;