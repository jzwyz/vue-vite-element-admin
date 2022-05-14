import Layout from '@/components/layout/Layout.vue'
import { RouteRecordRaw } from 'vue-router'

const config: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/',
        name: 'root',
        redirect: '/system'
    },
    {
        path: '/system',
        name: 'system',
        component: Layout,
        children: [
            {
                path: '',
                name: 'system',
                component: () => import('@/views/system/Home.vue'),
            }
        ]
    },
    {
        path: '/:(.status)',
        name: 'error',
        component: Layout
    }
]

export { config }