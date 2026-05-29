// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
import type { AxiosResponse } from "axios";
import { VAxios } from "@/utils/axios/Axios";
import { AxiosTransform } from "@/utils/axios/axiosTransform";
import {
  joinTimestamp,
  formatRequestDate,
  setObjToUrlParams,
} from "@/utils/axios/helper";
import { createLocalStorage } from "@/utils/storage";
import {
  RequestOptions,
  Result,
  RequestEnum,
  ResultEnum,
  ContentTypeEnum,
} from "@/utils/axios/types";
import { useUser } from "@/hooks/useUser";
// 全局 api 配置信息
const { VITE_GLOB_API_URL_PREFIX, VITE_GLOB_API_URL } = import.meta.env;
const urlPrefix = VITE_GLOB_API_URL_PREFIX || "";

// 使用功 i18n
const ls = createLocalStorage();

/**
 * @description: 数据处理, 方便区分多种处理方式
 */
const transform: AxiosTransform = {
  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const {
      apiUrl,
      joinPrefix,
      joinParamsToUrl,
      formatDate,
      joinTime = true,
    } = options;
    // console.log(JSON.parse(JSON.stringify(config)), options);

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl) {
      config.url = `${apiUrl}${config.url}`;
    }

    const params = config.params || {};
    const data = config.data || false;

    if (
      config.method?.toUpperCase() === RequestEnum.GET ||
      RequestEnum.DELETE
    ) {
      if (typeof params !== "string") {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(
          params || {},
          joinTimestamp(joinTime, false)
        );
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (typeof params !== "string") {
        formatDate && formatRequestDate(params);
        if (
          Reflect.has(config, "data") &&
          config.data &&
          Object.keys(config.data).length
        ) {
          config.data = data;
          config.params = params;
        } else {
          config.data = config.data || params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          );
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    // 请求之前处理config
    const { getToken } = useUser();
    getToken.value && (config.headers!.Authorization = getToken.value);
    return config;
  },

  /**
   * @description: 处理请求成功数据
   */
  transformRequestData: (
    res: AxiosResponse<Result>,
    options: RequestOptions
  ) => {
    let {
      isShowErrorMessage,
      isShowSuccessMessage,
      successMessageText,
      errorMessageMode,
      errorMessageText,
      isTransformResponse,
      isReturnNativeResponse,
    } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 对返回数据不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取 status, data, message, success 这些信息时开启
    if (isTransformResponse) {
      return res.data;
    }

    const reject = Promise.reject.bind(Promise);

    // 请求为空直接 reject
    const { data: result } = res;
    if (!result) {
      return reject(result);
    }

    // 这里 status, data, message, success 为 后台统一的字段
    // @ts-ignore
    const { status, data, message, success } = result;

    // 请求成功
    const hasSuccess =
      result && Reflect.has(result, "status") && status === ResultEnum.SUCCESS;

    // 是否显示成功提示信息
    if (isShowSuccessMessage) {
      if ((status >= 200 && status <= 300) || status === 304) {
        // IMessage({
        //   type: "success",
        //   message: successMessageText || message,
        //   // || t('system.api.operationSuccess')
        // });
      }
    }

    // 接口请求成功，直接返回结果
    if (hasSuccess && success) {
      return result;
    }

    // 接口请求错误，统一提示错误信息
    if (isShowErrorMessage) {
      if (!hasSuccess || !success) {
        if (status < 200 || (status > 300 && status !== 304)) {
          if (status === 401) {
          }

          if (errorMessageMode === "modal") {
            // ElMessageBox.alert(
            //   errorMessageText || message || checkStatus(status, message),
            //   t("system.api.errorTip"),
            //   {
            //     confirmButtonText: t("system.btn.okBtnTxt"),
            //   }
            // );
          } else {
            // IMessage({
            //   type: "error",
            //   message:
            //     errorMessageText || message || checkStatus(status, message),
            // });
          }
        } else {
          //   IMessage({
          //     type: "error",
          //     message:
          //       errorMessageText || message || checkStatus(status, message),
          //   });
        }
      }
    }
    return result;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    // 此处异常尚未处理, 遇到之后在进行处理
    /*	console.log(error);
		console.error('responseInterceptorsCatch 异常尚未处理, 遇到之后在进行处理');*/
    /*const { response, code, message } = error || {};
        const msg: string =
            response && response.data && response.data.message ? response.data.message : '';
        const err: string = error.toString();
        try {
            if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
                IMessage.error(t('system.api.apiTimeoutMessage'));
                return;
            }
            if (err && err.includes('Network Error')) {
                ElMessageBox.alert(
                    t('system.api.networkExceptionMsg'),
                    t('system.api.networkException'),
                    {
                        confirmButtonText: t('system.btn.okBtnTxt'),
                        callback: action => {}
                    }
                );
                return;
            }
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
        // 请求是否被取消
        const isCancel = axios.isCancel(error);
        if (!isCancel) {
            IMessage.error(checkStatus(error.response && error.response.status, message));
        } else {
            console.warn(error, '请求被取消！');
        }*/
    return error;
  },
};

const Axios = new VAxios({
  timeout: 300 * 1000,
  // 接口前缀
  // prefixUrl: urlPrefix,
  headers: { "Content-Type": ContentTypeEnum.JSON },
  // 数据处理方式
  transform,
  // 配置项，下面的选项都可以在独立的接口请求中覆盖
  requestOptions: {
    // 接口地址
    apiUrl: VITE_GLOB_API_URL as string,
    // 默认将prefix 添加到url
    joinPrefix: true,
    // post请求的时候添加参数到url
    joinParamsToUrl: false,
    // 格式化提交参数时间
    formatDate: true,
    // 是否直接得到后端返回信息(不包含原生请求头)
    isTransformResponse: false,
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    isReturnNativeResponse: false,
    // 是否显示提示信息
    isShowSuccessMessage: false,
    // 是否显示报错提示信息
    isShowErrorMessage: true,
    // 消息提示类型
    errorMessageMode: "none",
  },
  withCredentials: false,
});

export default Axios;
