/**
 * @description: 后台管理模块组件配置
 */

// 后台管理（布局组件）

const BACKSTAGE_LAYOUT = () => import("@/views/backstage/backstage.vue");

// 用户管理
const USER = () =>
    import("@/views/backstage/user/user.vue");

// 公告管理
const NOTICE = () =>
    import("@/views/backstage/notice/notice.vue");
// 公告管理
const PROHIBITED = () =>
    import("@/views/backstage/prohibited/prohibited.vue");

export default {
    BACKSTAGE_LAYOUT,
    USER,
    NOTICE,
    PROHIBITED
};
