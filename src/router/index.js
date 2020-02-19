import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('@/views/index'),
        },
        {
            path: '/ob/:id',
            component: () => import('@/views/ob'),
        },
        {
            path: '/list',
            component: () => import('@/views/list'),
        },
        {
            path: '/setting',
            component: () => import('@/views/setting'),
        },
        {
            path: '*',
            redirect: '/',
        },
    ]
})