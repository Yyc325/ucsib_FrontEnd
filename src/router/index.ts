import { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import localRoutes from "./routes/localRoutes";
import { baseRoutes } from "./routes/baseRoutes";
import { PageEnum } from "./constants/canstants";
import { useUser } from "@/hooks/useUser";
import backstageRoutes from "./routes/backstageRoutes";
import { get_all_users } from "@/apis/backstage/user";
import {useI18n} from "vue-i18n";

const routes = [...localRoutes, ...baseRoutes, ...backstageRoutes] as any[];
const noPermissionsPath = [PageEnum.BASE_LOGIN, PageEnum.BASE_REGISTER] as any;
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export const setupRouter = (app: App<Element>) => {
  router.beforeEach(async (to, from, next) => {
    const { getToken, getPhone, setUserInfo, getUserInfo } = useUser();
    if (getToken.value) {
      if (!getUserInfo.value) {
        const userInfo = await get_all_users({ phone: getPhone.value });
        if (userInfo.status === "success" && userInfo.data.length) {
          setUserInfo(userInfo.data[0]);
        }
      }
      if (to.path === PageEnum.ROOT_ROUTE || to.path === PageEnum.BASE_LOGIN) {
        next(PageEnum.BASE_HOME);
      } else {
        next();
      }
    } else {
      const isBackstage = to.path.includes('backstage')
      // if(!isBackstage){
        next();
      // }else{
      //   next(PageEnum.BASE_LOGIN_NAME);
      // }
    }
  });
  router.afterEach((to, from) => {
    if (typeof to.meta.title === "string") {
      document.title = to.meta.title;
    } else {
      // 提供一个默认值或者错误处理
      document.title = "首页";
    }
  });
  app.use(router);
};


