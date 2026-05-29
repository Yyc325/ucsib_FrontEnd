import { computed } from "vue";
import { useUserStoreWithOut } from "@/store/modules/userStore";

export function useUser() {
  const userStore = useUserStoreWithOut();

  // 获取 token
  const getToken = computed(() => userStore.getToken);

  // 获取用户信息
  const getUserInfo = computed(() => userStore.getUserInfo);
  // 获取用户信息
  const getPhone = computed(() => userStore.getPhone);

  // 设置 token
  function setToken(token: string | null) {
    userStore.setToken(token);
  }

  // 设置用户信息
  function setUserInfo(info) {
    userStore.setUserInfo(info);
  }

  // 设置用户信息
  function setPhone(phone) {
    userStore.setPhone(phone);
  }

  return {
    getToken,
    getUserInfo,
    getPhone,
    setToken,
    setUserInfo,
    setPhone,
  };
}
