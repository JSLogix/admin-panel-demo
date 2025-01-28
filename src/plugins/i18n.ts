import { createI18n } from "vue-i18n";
import { uz, ru, en, kz, tj } from "@/constants/locale";

export const i18n = createI18n({
  legacy: false,
  locale: "uz",
  fallbackLocale: "uz",
  messages: {
    uz,
    ru,
    en,
    kz,
    tj,
  },
});
