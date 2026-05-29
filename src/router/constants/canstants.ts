export enum PageEnum {
  ROOT_ROUTE = "/",
  // 主页
  BASE_HOME = "/home",
  BASE_HOME_NAME = "home",
  // 登录页
  BASE_LOGIN = "/login",
  BASE_LOGIN_NAME = "login",
  // 注册页
  BASE_REGISTER = "/register",
  BASE_REGISTER_NAME = "register",
  // 学生页
  BASE_NEWS = "/students",
  BASE_NEWS_NAME = "students",
}
// 免登 页面组件
// 免登 页面组件
export const noPermissionsRoutes = {
  ACCOUNT: () => import("@/views/backstage/account/account.vue"),
};

