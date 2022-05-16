import Layout from '@/components/layout/Layout.vue'
import { RouteRecordRaw } from 'vue-router'

const menuConfig: RouteRecordRaw[] = [
    {
        path: '/system',
        name: 'system',
        component: Layout,
        children: [
            {
                path: '',
                name: 'syshome',
                component: () => import('@/views/system/Home.vue'),
            }
        ]
    }
]

const config: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/',
        name: 'root',
        redirect: '/system',
        meta: { title: 'root' }
    },
    ...menuConfig,
    {
        path: '/:path(.*)*',
        name: 'error',
        component: () => import('@/views/Login.vue'),
    }
]

export { config, menuConfig }