import { useI18n } from '@/hooks/useI18n'
import { CacheEnum } from '@/enums/cache'
import { generate_cache_value } from '@/utils/cache'
import { useUserStore } from '@/stores/user'

export const buildErrorMap: () => { [key: string]: () => void } = () => {
    const { t } = useI18n('api_message');
    return {
        '401': () => {
            ElMessage.warning(t('not_login'));
            // todo: 清除历史cookie，并重定向到登陆页
            generate_cache_value(CacheEnum.LOGOUT_URL_LOCAL, window.location.href, -1, 'localStorage')
            const userStore = useUserStore()
            userStore.logout()
        },
        '403': () => {
            ElMessage.info(t('unauthorized'))
        },
        '404': () => {
            ElMessage.warning(t('not_found'))
        },
        '405': () => {
            ElMessage.error(t('method_not_allowed'))
        },
        '500': () => {
            ElMessage.warning(t('internal_server_error'))
        },
        '502': () => {
            ElMessage.warning(t('bad_gateway'))
        },
        '504': () => {
            ElMessage.warning(t('gateway_time_out'))
        },
        '-1': () => {
            ElMessage.warning(t('request_error'))
        },
    }
}

export const DefaultBody = { data: null, status: 500, statusText: '' };

export function handleResult<T>(result: T) {
    return result || null
}

export function checkResult(isOk: boolean | null | { detail: any }) {
    const { t } = useI18n('default');
    if (isOk === true) {
        ElMessage.success(t('operation_success'))
    } else {
        if (isOk && 'detail' in isOk) {
            ElMessage.warning(t('operation_faild_msg', { msg: isOk['detail'] }))
        } else {
            ElMessage.warning(t('operation_faild'))
        }
        console.error('checkResult', isOk)
    }
}