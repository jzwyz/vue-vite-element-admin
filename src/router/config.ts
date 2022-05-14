import Layout from '@/components/layout/Layout.vue'
import { RouteRecordRaw } from 'vue-router'

const config: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: Layout,
        redirect: '/system',
        children: [
            {
                path: 'system',
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