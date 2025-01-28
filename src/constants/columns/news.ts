import { i18n } from "@/plugins/i18n";

export const columns = [
  {
    title: "№",
    key: "order_number",
    width: "100px",
  },
  {
    title: i18n.global.t("columns.title"),
    key: "title",
    dataIndex: "title",
    width: "140px",
  },
  {
    title: i18n.global.t("columns.created_time"),
    key: "date",
    width: "140px",
    dataIndex: "created_at",
  },
  {
    title: i18n.global.t("columns.view_count"),
    key: "view",
    width: "140px",
    dataIndex: "views",
  },
  {
    title: i18n.global.t("columns.actions"),
    key: "action",
    width: "1%",
  },
];
