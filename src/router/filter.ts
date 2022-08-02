import { cloneDeepWith } from "lodash-es";
import { RouteRecordRaw } from "vue-router";

/**
 * 用户角色权限过滤
 * @param userRoles 
 * @param menuRoles 
 * @returns 
 */
export function menuRoleFilter(userRoles: string[], menuRoles: string[] = []) {
    if (menuRoles.length === 0) return true;
    return menuRoles.some(s => userRoles.includes(s))
}

/**
 * 动态路由菜单过滤
 * @param routers 
 * @param filterFunc 
 * @param filterArgs 
 * @param parentName 
 * @returns 
 */
export function filterDynamicRouters(routers: RouteRecordRaw[], filterFunc: Function, filterArgs: any[]) {
    const checkRouterPermission = (list: RouteRecordRaw[]) => {
        return list.filter(f => {
            if (f.children && f.children.length > 0) {
                f.children = checkRouterPermission(f.children)
            }
            return filterFunc(...filterArgs, f.meta?.roles, f.name)
        })
    }

    return checkRouterPermission(cloneDeepWith(routers))
}