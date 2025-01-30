import { i18n } from "@/plugins/i18n";

export function Rules(filterRules: any = []) {
  const map: any = {};
  for (let item of filterRules) {
    map[item] = { required: true, message: i18n.global.t("required") };
  }
  return map;
}
