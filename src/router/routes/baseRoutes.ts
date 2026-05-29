// 无需权限的基础路由(登录页\注册页\忘记密码页等)

import { AppRouteRecordRaw } from "../type";
import { ComponentCanstants } from "@/router/constants";
export const baseRoutes = [
  {
    path: "/login", // 路由的访问路径
    name: "Login", // 路由名称 可用于路由跳转
    component: ComponentCanstants["ACCOUNT"], // 组件动态引用
    meta: {
      title: "登录页", // 页面标题
    },
  },

  // {
  //   path: "/students",
  //   name: "Students",
  //   component: ComponentCanstants["STUDENTS"],
  //   meta: {
  //     title: "学生页",
  //   },
  // },
  // {
  //   path: "/faculty",
  //   name: "faculty",
  //   component: ComponentCanstants["FACULTY"],
  //   meta: {
  //     title: "教师页",
  //   },
  // },
  // {
  //   path: "/alumni",
  //   name: "alumni",
  //   component: ComponentCanstants["ALUMNI"],
  //   meta: {
  //     title: "校友页",
  //   },
  // }

] as AppRouteRecordRaw[];
