import { defineStore } from 'pinia'
import type { LocaleType } from "~/config";

interface LocaleInfo {
    locale: LocaleType
}

const useLocaleStore = defineStore({
    id: 'locale',
    state: () => ({
        locale: 'zh-CN'
    }),
    getters: {

    },
    actions: {
        setLocaleInfo(info: LocaleInfo) {
            this.locale = info.locale || this.locale || 'zh-CN'
            // todo: cache locale
        },
        initLocale() {
            this.setLocaleInfo({ locale: 'zh-CN' })
        }
    }
})

export { useLocaleStore }