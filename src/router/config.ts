import Layout from '@/components/layout/Layout.vue'
import { RouteRecordRaw } from 'vue-router'

// 动态 Menu 路由菜单
const menuConfig: RouteRecordRaw[] = [
    {
        path: '',
        name: 'home',
        meta: { icon: 'home', hide: false, index: 1 },
        component: () => import('@/views/system/Home.vue'),
    },
    {
        path: 'user',
        name: 'user',
        meta: { icon: 'user', hide: false, index: 1 },
        component: () => import('@/views/system/Home.vue'),
    },
    {
        path: 'about',
        name: 'about',
        meta: { icon: 'about', hide: false, index: 1 },
        component: () => import('@/views/system/Home.vue'),
    },
]

// 路由配置
const config: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/',
        name: 'root',
        redirect: '/login',
        meta: { title: 'root' }
    },
    {
        path: '/system',
        name: 'system',
        component: Layout,
        children: menuConfig
    },
    {
        path: '/:status(.*)*',
        name: 'error',
        component: () => import('@/components/errors/Error.vue')
    }
]

export { config, menuConfig }