/**
 * @description: 后台管理路由
 */

import { ComponentCanstants } from "../constants";
import { AppRouteRecordRaw } from "../type";
const backstageRoutes = [
  {
    path: "/backstage",
    name: "Backstage",
    component: ComponentCanstants["BACKSTAGE_LAYOUT"],
    meta: {
      title: "后台管理",
    },
    children: [
      {
        path: "user",
        name: "User",
        component: ComponentCanstants["USER"],
        meta: {
          title: "用户管理",
          description: "用于管理所用用户信息",
        },
      },
      {
        path: "notice",
        name: "Notice",
        component: ComponentCanstants["NOTICE"],
        meta: {
          title: "UCS IB 公告",
          description: "更多文化宣传，实时推送各类信息",
        },
      },
      {
        path: "prohibited",
        name: "Prohibited",
        component: ComponentCanstants["PROHIBITED"],
        meta: {
          title: "UCS IB 评论",
          description: "用于管理用户评论信息",
        },
      },
    ],
  },
] as AppRouteRecordRaw[];
export default backstageRoutes;
