import Axios from "@/utils/axios";

/**
 * @description: 用户注册
 * @param {string} data.user_name 用户名
 * @param {string} data.password 密码
 * @param {string} data.real_name 真实姓名
 * @param {string} data.phone 手机号
 */
export const admin_add = (data: {
  user_name: string;
  password: string;
  real_name: string;
  phone: string;
}) => {
  return Axios.request<any>({
    url: "/api/admin_role/admin_add",
    method: "POST",
    data,
  });
};

/**
 * @description: 用户登录
 * @param {string} data.phone 手机号
 * @param {string} data.password 密码
 */

export const admin_login = (data: { phone: string; password: string }) => {
  return Axios.request<any>({
    url: "/api/admin_role/login",
    method: "POST",
    data,
  });
};
