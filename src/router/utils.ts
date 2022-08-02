import { useI18n } from "@/hooks/useI18n"
import { useConfigStore } from "@/stores/config"
import { setHtmlTitle } from "@/utils/domUtil"
import { computed, watch } from "vue"
import { useRoute } from "vue-router"

export function breadcrumbRoutes() {
    const route = useRoute()
    const configStore = useConfigStore()
    const { t } = useI18n()

    const breadcrumbs = computed(() => {
        let routePath = route.path

        // 对于通用匹配模版需要额外处理
        if (route.name === 'super-router') {
            const menu = configStore.getMenus.find(f => f.path === route.params.bid)
            menu && (routePath = routePath.replace(route.params.bid as string, menu.name as string))
        }
        return routePath.split('/').filter(Boolean).map(m => t((`route_menu.${m}`)))
    })
    return {
        breadcrumbs
    }
}

export function watchRouteName() {

    const route = useRoute()
    const configStore = useConfigStore()
    const { t } = useI18n()

    const parseRouteName = (routeName: string) => {
        // TODO:对于通用匹配模版需要额外处理
        if (routeName === 'super-router') {
            const menu = configStore.getMenus.find(f => f.path === route.params.bid)
            if (menu) return menu.name as string
        }
        return t(`route_menu.${routeName}`)
    }

    const watchCallbackFun = (routeName: string) => {
        const routName = parseRouteName(routeName)
        setHtmlTitle(routName)
    }

    watch(() => route.name, watchCallbackFun)
}