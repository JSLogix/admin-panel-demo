import { i18n } from "@/plugins/i18n";

const list: any = [
  {
    title: i18n.global.t("menu.dashboard"),
    icon: "document",
    path: "/admin/dashboard",
    key: "dashboard",
  },
  {
    title: i18n.global.t("menu.users"),
    icon: "f-user",
    path: "/admin/users",
    key: "users",
  },
  {
    title: i18n.global.t("menu.categories"),
    icon: "pencil",
    path: "/admin/category",
    key: "categories",
  },
  {
    title: i18n.global.t("menu.videos"),
    icon: "img",
    path: "/admin/video/list",
    key: "videos",
  },
  {
    title: i18n.global.t("menu.appeal"),
    icon: "f-application",
    path: "/admin/appeal",
    key: "appeal",
  },
];

export { list };
