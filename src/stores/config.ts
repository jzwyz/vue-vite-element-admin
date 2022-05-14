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
        }
    }),
    getters: {

    },
    actions: {

    }
})

export { useConfigStore }