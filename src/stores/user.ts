import { defineStore } from 'pinia'
import { generate_cache_value, parse_cache_value, remove_cache_key } from '@/utils/cache'
import { CacheEnum } from '@/enums/cache'
import { UserStoreState } from '~/store'
import { LoginResult } from '~/api'
import { LOGIN_INFO_EXPIRED } from '@/config/constants'

export const useUserStore = defineStore({
    id: 'user',
    state: (): UserStoreState => ({
        accessToken: null,
        roles: [],
        userInfo: null,
    }),
    getters: {
        isLogin: state => !!state.accessToken,
        userName: state => state.userInfo?.username,
        roleList: state => state.roles,
    },
    actions: {
        setLoginInfo(loginInfo: LoginResult | null, cache: boolean = true) {
            this.accessToken = loginInfo?.access_token || null
            this.userInfo = loginInfo?.user_info || null
            this.roles = loginInfo?.roles || []
            cache && generate_cache_value(CacheEnum.LOGIN_INFOS, loginInfo, LOGIN_INFO_EXPIRED, 'sessionStorage')
        },
        loadCacheLoginInfo() {
            const loginInfo: any = parse_cache_value(CacheEnum.LOGIN_INFOS, 'sessionStorage')
            if (!loginInfo) return

            this.setLoginInfo(loginInfo, false)
        },
        logout() {
            this.setLoginInfo(null, false)
            remove_cache_key(CacheEnum.LOGIN_INFOS, 'sessionStorage')
        }
    }
})
