import { useUser } from "@/hooks/useUser";
import { createLocalStorage } from "@/utils/storage";
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
const { VITE_GLOB_API_URL } = import.meta.env;
/**
 * @description : 登录处理函数
 * @params : data 用户登录信息
 * */
export const loginCall = async (data: any) => {
  const reqData = {
    account: data.account,
    client_id: "client",
    scope: "all",
    client_secret: "123456",
    grant_type: "password",
    code: data.code || "",
    msgId: data.msgId || "",
    password: data.password,
    systemCode: "",
  };
  // const loginRes = await loginFn(reqData);
  const loginRes = null;
  return loginRes;
  // await loginAfter(loginRes.success)
};

/**
 * @description : 登录之后的处理函数
 * @params : flag 登录是否成功的标识
 * */
export const loginAfter = async (flag: boolean) => {
  if (flag) {
    // const UserInfoRes = await getUserInfo();
    const UserInfoRes = { success: false };
    if (UserInfoRes && UserInfoRes.success) {
      // setUserInfo(UserInfoRes.data);
      // await router.replace({ path: '/layout/orgsAndUsers/orgsAndUsersList' })
    } else {
      // setUserInfo(null);
    }
  }
};
/**
 * 获取验证码
 */
export const gainAuthCodeStep = () => {
  const { t } = useI18n();
  const authCodeState = reactive({
    account: "",
    isActiveAuthCode: false,
    authCodeBtnCon: t("tip.sendCode") as any,
    msgId: "",
    count: 60,
  });
  let timer: any;

  watch(
    () => authCodeState.account,
    (newVal: string, oldVal: string) => {
      if (newVal !== oldVal) {
        authCodeState.authCodeBtnCon = t("tip.sendCode");
        authCodeState.count = 60;
        clearInterval(timer);
      }
    }
  );
  const accountInput = (val: string, hasRegistered: boolean) => {
    authCodeState.account = val;
    authCodeState.isActiveAuthCode =
      /^1(3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/.test(val) &&
      !hasRegistered;
  };

  const handleGainAuthCode = async () => {
    if (!authCodeState.account) {
      ElMessage({
        type: "warning",
        message: t("tip.phone"),
      });
    }
    if (authCodeState.isActiveAuthCode) {
      authCodeState.isActiveAuthCode = false;
      if (timer) clearInterval(timer);
      authCodeState.authCodeBtnCon = authCodeState.count;
      timer = setInterval(() => {
        authCodeState.count--;
        authCodeState.authCodeBtnCon = authCodeState.count;
        if (authCodeState.count === 0) {
          authCodeState.count = 60;
          authCodeState.isActiveAuthCode = true;
          authCodeState.authCodeBtnCon = t("tip.reSendCode");
          clearInterval(timer);
        }
      }, 1000);
      // const res = await getAuthCode({
      //   account: authCodeState.account,
      // });
      const res = { success: false, message: "" };

      if (res.success) {
        authCodeState.msgId = res.message;
      }
    }
  };

  return {
    authCodeState,
    accountInput,
    handleGainAuthCode,
  };
};
export const exitAfter = async () => {
  const ls = createLocalStorage();
  const { setUserInfo, setToken } = useUser();
  // 清除本地存储
  ls.clear();
  setUserInfo(null);
  setToken("");
};
