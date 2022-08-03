import { defineStore } from 'pinia'
import { setHtmlDark } from '@/utils/domUtil';
import { generate_cache_value, parse_cache_value } from '@/utils/cache'
import { CacheEnum } from '@/enums/cache'
import { ConfigStoreState } from '~/store'
import { RouteRecordRaw } from 'vue-router';

const useConfigStore = defineStore({
    id: 'config',
    state: () => ({
        elConfigProvider: {
            size: 'default',
            namespace: 'vvea',
            button: {
                autoInsertSpace: true
            },
            message: {
                max: 3
            }
        },
        collapse: false,
        iconSize: 18,
        dark: false,
        mainHeight: 630,
        menus: [],
        appVersion: import.meta.env.VITE_APP_VERSION || 'v0.0.0',
        gitCommit: import.meta.env.VITE_APP_GIT_COMMIT || '-',
        appEnv: import.meta.env.VITE_APP_ENV || 'DEV'
    }) as ConfigStoreState,
    getters: {
        isCollapse: (state) => state.collapse,
        getMenus: state => state.menus
    },
    actions: {
        changeDarkStatus(status: boolean) {
            this.dark = status;
            setHtmlDark(status);
        },
        setMainHeight(height: number = 630) {
            this.mainHeight = height
        },
        setMenus(menus: RouteRecordRaw[]) {
            this.menus = menus
        },
        handleCollapse() {
            this.collapse = !this.collapse
            this.cacheLocalConfig()
        },
        loadLocalConfig() {
            try {
                const parseConfig = parse_cache_value(CacheEnum.LOCAL_CONFIG_KEY, 'localStorage')
                this.collapse = parseConfig.collapse || this.collapse;
                this.iconSize = parseConfig.iconSize || this.iconSize;
                this.dark = parseConfig.dark || this.dark;
            } catch (err) {
                console.error(err)
            }
        },
        cacheLocalConfig() {
            generate_cache_value(CacheEnum.LOCAL_CONFIG_KEY, {
                collapse: this.collapse,
                iconSize: this.iconSize,
                dark: this.dark
            }, -1, 'localStorage')
        }
    }
})

export { useConfigStore }