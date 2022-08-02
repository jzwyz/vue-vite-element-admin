import { useRouter, RouteRecordRaw, RouteRecordName, isNavigationFailure } from 'vue-router'
import { computed, ComputedRef, watch } from 'vue';
import NProgress from 'nprogress'
import { useUserStore } from '@/stores/user';
import { useConfigStore } from '@/stores/config';
import { filterDynamicRouters, menuRoleFilter } from './filter';
import { menuConfig } from './config';

function flattenDeepMenus(menus: RouteRecordRaw[]) {
    const fdMenus: RouteRecordRaw[] = []
    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        if (menu.children && menu.children.length > 0) {
            fdMenus.push(...flattenDeepMenus(menu.children))
        }
        fdMenus.push(menu)
    }
    return fdMenus
}

function hasRouterPermission(menus: ComputedRef<RouteRecordRaw[]>, routeName: RouteRecordName) {
    if (menus.value.length === 0) return false
    return menus.value.some(s => s.name === routeName)
}

export function routerGuard() {
    const router = useRouter()
    const configStore = useConfigStore()
    const userStore = useUserStore()

    const redirectLogin = () => {
        if (userStore.isLogin) return
        router.push('/login')
    }

    const menus = computed(() => flattenDeepMenus(configStore.getMenus))

    // router前
    router.beforeEach(function (to, from, next) {
        NProgress.start();
        console.debug('>>>> router guard beforeEach', to.name, '|', from.name)

        if (!to.name) return next('/404')
        if ((to.meta.roles || []).length === 0) return next()

        const isNext = hasRouterPermission(menus, to.name)
        console.debug('>>>> router guard beforeEach isNext', isNext)
        if (isNext) return next()
        return next('/401')
    })

    // router后
    router.afterEach((to, from, failure) => {
        // 从 to 来，到 from 去
        if (isNavigationFailure(failure)) {
            console.error('failed navigation', to.name, '|', from.name, '|', failure)
            failure && from.name !== 'system' && router.push({ name: 'system' })
        }
        if (to.name != 'login') redirectLogin()
        NProgress.done();
    });
}

export function initRouterMenus() {
    const configStore = useConfigStore()
    const userStore = useUserStore()

    const initMenus = () => {
        const dynamicMenus = filterDynamicRouters([...menuConfig], menuRoleFilter, [userStore.roleList])
        configStore.setMenus(dynamicMenus.filter(f => !(f.meta && f.meta.hidden)))
    }
    initMenus()
    watch(() => userStore.isLogin, initMenus)
    routerGuard()
}