import { defineStore } from 'pinia'

const useCommonStore = defineStore({
    id: 'common',
    state: () => ({
        collapse: false,
        iconSize: 18
    }),
    getters: {
        isCollapse: (state) => state.collapse,
    },
    actions: {
        handleCollapse() {
            this.collapse = !this.collapse
        }
    }
})

export {useCommonStore};