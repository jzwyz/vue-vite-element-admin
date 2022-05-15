import { setHtmlDark } from '@/utils/domUtil';
import { defineStore } from 'pinia'

const useConfigStore = defineStore({
    id: 'config',
    state: () => ({
        elConfigProvider: {
            size: 'default',
            namespace: 'el',
            button: {},
            message: {
                max: 3
            }
        },
        dark: false
    }),
    getters: {

    },
    actions: {
        changeDarkStatus(status: boolean) {
            this.dark = status;
            setHtmlDark(status);
        }
    }
})

export { useConfigStore }