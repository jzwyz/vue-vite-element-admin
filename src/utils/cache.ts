import { CacheEnum } from '@/enums/cache'
import { LOCAL_CACHE_EXPIRED } from '@/config/constants'

const cacheKeyPerfix = CacheEnum.LOCALE_KEY

interface CacheOptions {
    expired?: number,
    durt?: number,
    value: any,
}

type CacheType = 'sessionStorage' | 'localStorage'

export function generate_cache_value(key: string, value: any, expired: number = 1000 * 60 * 2, cacheType: CacheType = 'sessionStorage') {
    try {
        const cacheFun = window[cacheType]
        const dataBody: CacheOptions = { expired: Date.now() + expired, durt: expired, value }
        if (expired === -1) delete dataBody.expired;
        cacheFun.setItem(`${cacheKeyPerfix}:${key}`, JSON.stringify(dataBody))
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export function parse_cache_value(key: string, cacheType: CacheType = 'sessionStorage', refresh: boolean = false) {
    try {
        const cacheKey = `${cacheKeyPerfix}:${key}`
        const cacheFun = window[cacheType]
        const data = cacheFun.getItem(cacheKey)
        if (!data) return;
        const dataBody = JSON.parse(data) as CacheOptions;
        if (dataBody.expired && dataBody.expired < Date.now()) {
            cacheFun.removeItem(cacheKey);
            return;
        }
        refresh && generate_cache_value(key, dataBody.value, dataBody.durt, cacheType)
        return dataBody.value;
    } catch (error) {
        console.error(error)
        return;
    }
}

export function remove_cache_key(key: string, cacheType: CacheType = 'sessionStorage') {
    window[cacheType].removeItem(`${cacheKeyPerfix}:${key}`)
}

export function clear_cache(cacheType: CacheType = 'sessionStorage') {
    window[cacheType].clear()
}

export function setSessionCache(key: string, value: any, expired: number = LOCAL_CACHE_EXPIRED) {
    generate_cache_value(key, value, expired, 'sessionStorage')
}
export function getSessionCache(key: string) {
    return parse_cache_value(key, 'sessionStorage')
}
export function removeSessionCache(key: string) {
    remove_cache_key(key, 'sessionStorage')
}

export function setLocalCache(key: string, value: any, expired: number = LOCAL_CACHE_EXPIRED) {
    generate_cache_value(key, value, expired, 'localStorage')
}
export function getLocalCache(key: string) {
    return parse_cache_value(key, 'localStorage')
}
export function removeLocalCache(key: string) {
    remove_cache_key(key, 'localStorage')
}

export function clearAllCache() {
    clear_cache('localStorage')
    clear_cache('sessionStorage')
}
