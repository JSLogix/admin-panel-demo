import { i18n } from "@/plugins/i18n";
import { ERole, ELang } from "@/utilities/enums";

export const LRole = [
  {
    value: ERole.ADMIN,
    label: "ADMIN",
  },
  {
    value: ERole.CLIENT,
    label: "CLIENT",
  },
];
export const LSM = new Set(["INSTAGRAM", "TELEGRAM", "FACEBOOK", "YOUTUBE"]);
export const toGetRole = (value: string) =>
  LRole.find((item) => item.value === value);
export const LLang = [
  {
    label: "O'zbek",
    text: "O'zbek tilida to'ldiring",
    flag: "/images/lang/uz.png",
    value: ELang.UZ,
  },
  {
    label: "Русский",
    text: "Заполнить на русском языке",
    flag: "/images/lang/ru.png",
    value: ELang.RU,
  },
  {
    label: "English",
    text: "Fill in English",
    flag: "/images/lang/en.png",
    value: ELang.EN,
  },
  {
    label: "Тоҷикӣ",
    text: "Бо забони тоҷикӣ пур кунед",
    flag: "/images/lang/tj.png",
    value: ELang.TJ,
  },
  {
    label: "Қазақша",
    text: "Қазақ тілінде толтырыңыз",
    flag: "/images/lang/kz.png",
    value: ELang.KZ,
  },
];

export const listStatus = [
  {
    label: i18n.global.t("listStatus.new"),
    value: "NEW",
  },
  {
    label: i18n.global.t("listStatus.in_progress"),
    value: "IN-PROCESS",
  },
  {
    label: i18n.global.t("listStatus.finished"),
    value: "FINISHED",
  },
];

export const listPrivacy = [
  {
    label: i18n.global.t("listPrivacy.unlisted"),
    value: "unlisted",
  },
  {
    label: i18n.global.t("listPrivacy.public"),
    value: "public",
  },
  {
    label: i18n.global.t("listPrivacy.private"),
    value: "private",
  },
];

export const LStatus = [
  {
    label: i18n.global.t("LStatus.active"),
    value: true,
  },
  {
    label: i18n.global.t("LStatus.nonActive"),
    value: false,
  },
];

export const LAppealStatus = [
  {
    label: i18n.global.t("listStatus.new"),
    value: 'NEW',
  },
  {
    label: i18n.global.t("listStatus.in_progress"),
    value: 'PROCESSED',
  },
  {
    label: i18n.global.t("listStatus.finished"),
    value: 'DELAYED',
  },
];
