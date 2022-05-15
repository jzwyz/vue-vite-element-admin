// import { useI18n } from 'vue-i18n';
import { ElMessage as message } from 'element-plus';

export const buildErrorMap: () => { [key: string]: () => void } = () => {
    // const { t } = useI18n();
    return {
        '401': () => {
            message.warning('未登陆');
            // todo: 清除历史cookie，并重定向到登陆页
            // window.localStorage.setItem(LOGOUT_URL_LOCAL, window.location.href);
            // window.location.href = resolveUrl(`${window.location.origin}/${BASE_API}/login`)
        },
        '403': () => {
            message.info('未授权')
        },
        '404': () => {
            message.warning('找不到页面')
        },
        '405': () => {
            message.error('请求方式错误')
        },
        '500': () => {
            message.warning('服务器内部错误')
        },
        '502': () => {
            message.warning('服务器网关错误')
        },
        '504': () => {
            message.warning('服务器网关超时')
        },
        '-1': () => {
            message.warning('请求错误，请重试')
        },
    };
}