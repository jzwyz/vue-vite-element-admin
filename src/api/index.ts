import type { App } from 'vue';
import qs from 'qs';
import Axios, { AxiosInstance } from 'axios';
import NProgress from 'nprogress';
import { buildErrorMap } from './utils'

const { BASE_API_PREFIX, BASE_API_TIMEOUT } = import.meta.env;

let axios: AxiosInstance;

const defaultBody = { data: null, status: 500, statusText: '' };


function setupAxios(app: App<Element>) {

    axios = Axios.create({
        baseURL: BASE_API_PREFIX || '/api',
        timeout: BASE_API_TIMEOUT || (1000 * 60), // 默认请求超时时间 60s
        headers: {
            'Content-Type': 'application/json'
        },
        // 使用 qs 模块, 解析请求中的params参数
        paramsSerializer: (params: any) => {
            return qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true });
        }
    })

    const handleErrorStatus = buildErrorMap();

    axios.interceptors.request.use(function (config) {
        NProgress.start();
        return config;
    }, function (error) {
        console.error(error);
        return Promise.resolve(defaultBody)
    })

    axios.interceptors.response.use(function (response) {
        NProgress.done();
        // TODO: 结合自己的业务逻辑决定是否需要响应完整的数据
        return response.data;
    }, function (error) {
        NProgress.done();
        let { status, statusText } = error.response || { status: '-1', statusText: '' }
        if (!(`${status}` in handleErrorStatus)) status = '-1'
        handleErrorStatus[status + '']();
        return Promise.resolve({ data: null, status, statusText })
    })

    app.config.globalProperties.$http = axios;
}

export { setupAxios, axios };