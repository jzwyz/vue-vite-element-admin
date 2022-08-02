// API前缀
export const BASE_API_PREFIX = import.meta.env.BASE_API_PREFIX || '/api'
// API超时
export const BASE_API_TIMEOUT = import.meta.env.BASE_API_TIMEOUT || 30000
// 本地缓存时长: 1分钟
export const LOCAL_CACHE_EXPIRED = 1000 * 60 * 1
// 登录信息缓存时长 30分钟
export const LOGIN_INFO_EXPIRED = 1000 * 60 * 30