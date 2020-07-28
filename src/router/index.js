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
            children:[
                {
                    path: '',
                    redirect: 'app'
                },
                {
                    path: 'app',
                    component: () => import('@/views/setting/application'),
                },
                {
                    path: 'download',
                    component: () => import('@/views/setting/download'),
                },
                {
                    path: 'observer',
                    component: () => import('@/views/setting/observer'),
                },
                {
                    path: 'about',
                    component: () => import('@/views/setting/about'),
                },
            ]
        },
        {
            path: '*',
            redirect: '/',
        },
    ]
})