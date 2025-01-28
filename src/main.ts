import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import VueApexCharts from "vue3-apexcharts";
import Antd from "ant-design-vue";
import router from "@/router/index";
import setupRouteGuards from "@/router/guard";
import "@/assets/fonts/tilda-sans/stylesheet.css";
import "@/assets/scss/main.scss";
import { toSetupGlobalComponents } from "@/components/global";
import { i18n } from "@/plugins/i18n";
const pinia = createPinia();
const app = createApp(App);

toSetupGlobalComponents(app);

// app.config.errorHandler = (err):void => {
//     console.log(err);
// };
app.use(VueApexCharts);
app.use(router).use(Antd).use(pinia).use(i18n);
setupRouteGuards();
app.mount("#app");
