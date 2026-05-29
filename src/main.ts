import { createApp } from "vue";
import App from "@/App.vue";
import pinia from "@/store";
import "@/assets/css/reset/reset.css";
import "@/assets/iconfont/iconfont.css";
import "@/assets/iconfont2/iconfont.css";
import "@/assets/css/index.scss";
// 组件引入
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import '@/assets/css/tailwind.css'
// 路由引入
import { router, setupRouter } from "@/router";
import i18n from "./language";
import "@/utils/func/remTransform";

// import "@/assets/js/autoFlex";

function MountApp() {
  const app = createApp(App);
  app.use(i18n);
  app.use(pinia);
  app.use(ElementPlus);
  setupRouter(app);
  router.isReady().then(() => {
    app.mount("#app", true);
  });
}
MountApp();
