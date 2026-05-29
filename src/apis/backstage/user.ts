import Axios from "@/utils/axios";
/**
 * @description: 查询所有用户
 * @param {any} data.phone 手机号
 * @param {any} data.userName 姓名
 *
 */
export const get_all_users = (data: any) => {
  return Axios.request({
    url: "/api/admin_role/account_all",
    method: "POST",
    data,
  });
};

/**
 * @description: 修改用户身份
 * @param {string} data.phone 手机号
 * @param {string} data.identity 身份类别
 * */

export const identity_authorization = (data: any) => {
  return Axios.request({
    url: "/api/admin_role/identity_authorization",
    method: "POST",
    data,
  })
}