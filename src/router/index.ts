import { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import localRoutes from "./routes/localRoutes";
import { baseRoutes } from "./routes/baseRoutes";
import { PageEnum } from "./constants/canstants";
import { useUser } from "@/hooks/useUser";
import backstageRoutes from "./routes/backstageRoutes";
import { get_current_account } from "@/apis/backstage/account";

const routes = [...localRoutes, ...baseRoutes, ...backstageRoutes] as any[];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export const setupRouter = (app: App<Element>) => {
  router.beforeEach(async (to, _from, next) => {
    const { getToken, setToken, setUserInfo, getUserInfo } = useUser();
    const isBackstage = to.path.startsWith("/backstage");

    if (!getToken.value) {
      if (isBackstage) {
        next(PageEnum.BASE_LOGIN);
      } else {
        next();
      }
      return;
    }

    let userInfo = getUserInfo.value;
    if (!userInfo) {
      try {
        const response = await get_current_account();
        if (response.status === "success") {
          userInfo = response.data;
          setUserInfo(userInfo);
        }
      } catch (_error) {
        setToken(null);
        setUserInfo(null);
        next(isBackstage ? PageEnum.BASE_LOGIN : PageEnum.BASE_HOME);
        return;
      }
    }

    const allowedRoles = to.meta.permissions as string[] | undefined;
    if (allowedRoles?.length && !allowedRoles.includes(userInfo?.identity)) {
      next(PageEnum.BASE_HOME);
      return;
    }

    if (to.path === PageEnum.ROOT_ROUTE || to.path === PageEnum.BASE_LOGIN) {
      next(PageEnum.BASE_HOME);
    } else {
      next();
    }
  });

  router.afterEach((to) => {
    document.title = typeof to.meta.title === "string" ? to.meta.title : "首页";
  });
  app.use(router);
};
