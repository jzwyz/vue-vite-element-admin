import 'vue-router'


declare interface CustomRouteQuery {
}

declare module 'vue-router' {
    interface RouteMeta {
        //菜单图标
        icon?: string;
        //是否隐藏菜单
        hidden?: boolean;
        // 角色列表
        roles?: string[];
        // url 前缀
        perfix?: string;
        // 菜单排序
        index?: number;
        // ...
    }

    interface RouteLocationNormalizedLoaded {
        query: CustomRouteQuery
    }
}