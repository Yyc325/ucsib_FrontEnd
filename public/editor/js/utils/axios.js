const Axios = window.axios;
const request = Axios.create({
    baseURL:'http://sso.lowcode.net.cn:9008/',
    withCredentials:true,
})
request.defaults.withCredentials = true;

window.request = request;
