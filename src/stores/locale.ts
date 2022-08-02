import { defineStore } from 'pinia'
import type { LocaleStoreState } from "~/store";
import { setLocalCache, getLocalCache } from '@/utils/cache'
import { CacheEnum } from '@/enums/cache';

const useLocaleStore = defineStore({
    id: 'locale',
    state: () => ({
        locale: 'zh-CN'
    }) as LocaleStoreState,
    getters: {

    },
    actions: {
        setLocaleInfo(info: LocaleStoreState) {
            this.locale = info.locale || this.locale || 'zh-CN'
            setLocalCache(CacheEnum.LANG, this.locale, -1)
        },
        initLocale() {
            const lang = getLocalCache(CacheEnum.LANG)
            this.locale = lang || 'zh-CN'
        }
    }
})

export { useLocaleStore }