import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import * as AuthAction from '../src/api/auth'

// 404
import error from './views/404'

Vue.use(Router);

NProgress.configure({
    showSpinner: false
})

let mainHome = [{
    path: '/home', //
    meta: {
        title: '商户首页'
    },
    component: () => import('@/views/home.vue'),
},
{
    path: '/merchantInfo', //
    meta: {
        title: '商户详情'
    },
    component: () => import('@/views/merchantInfo.vue'),
},
{
    path: '/merchantApply', //
    meta: {
        title: '申请商家'
    },
    component: () => import('@/views/merchantApply'),
},
{
    path: '/merchantApply/personal', //
    meta: {
        title: '申请个人商家'
    },
    component: () => import('@/views/merchantApply/personal.vue'),
},
{
    path: '/merchantApply/enterprise', //
    meta: {
        title: '申请企业商家'
    },
    component: () => import('@/views/merchantApply/enterprise.vue'),
},
{
    path: '/order', //
    meta: {
        title: '订单管理'
    },
    redirect: to => {
        return '/order/list'
    },
    component: () => import('@/views/order/index.vue'),
    children: [{
        path: '/order/list', //
        meta: {
            title: '订单列表'
        },
        component: () => import('@/views/order/orderList.vue'),

    },
    {
        path: '/order/list/info/:id', //
        meta: {
            title: '订单详情'
        },
        component: () => import('@/views/order/orderInfo.vue'),

    }
    ]
},
{
    path: '/commodity', //
    meta: {
        title: '商品管理'
    },
    redirect: to => {
        return '/commodity/list'
    },
    component: () => import('@/views/commodity'),
    children: [{
        path: '/commodity/list', //
        meta: {
            title: '商品列表'
        },
        component: () => import('@/views/commodity/commodityList.vue'),
    }, {
        path: '/commodity/list/info', //
        meta: {
            title: '商品详情'
        },
        component: () => import('@/views/commodity/commodityInfo.vue'),
        // component:()=>import('@/views/commodity/aaaa.vue'),
    }, {
        path: '/commodity/classis', //
        meta: {
            title: '商品分类'
        },
        component: () => import('@/views/commodity/classis.vue'),
        // :options="cascaderOptions"
        //                     @active-item-change="onGenerItemChange"
        //                     :change-on-select="false"
        //                     :props="cascaderProps"
        //                     expand-trigger="click"
    }]
}, {
    // 资源管理
    path: '/resources',
    meta: {
        title: '资源管理'
    },
    // redirect: to => {
    //     return '/resources'
    // },
    component: () => import('@/views/resources'),
    children: [{
        path: '/resources/imageList',
        meta: {
            title: '图片列表'
        },
        component: () => import('@/views/resources/imageList.vue'),
    }
        // ,{
        //     path:'/resources/videoList',
        //     meta: {
        //         title: '视频列表'
        //     },
        //     component:()=>import('@/views/resources/videoList.vue'),
        // }
    ]
}
];

let router = new Router({
    mode: 'history',
    routes: [{
        path: '/login', //
        component: () => import('@/views/access'),
    },
    {
        path: '/', //
        redirect: to => {
            return '/merchantApply'
        },
        meta: {
            title: '首页'
        },
        component: () => import('@/views/main'),
        children: mainHome
    },
    {
        path: '*',
        component: error,
        meta: {
            title: '页面走丢啦'
        }
    },
    ]
})
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.fullPath == "/login") {
        if (AuthAction.getToken()) {
            next({
                path: '/'
            })
            // if(new Date().getTime()-AuthAction.getExpires()>=6000*1000){
            //   requestRefreshToken().then(type=>{
            //     type==1?next({path: '/main'}):next({path: '/login'})
            //   })
            // }     
        } else {
            next();
        }
    } else {
        console.log(AuthAction.getToken())
        if (AuthAction.getToken()) { //判断本地是否存在token
            next()
            // if(new Date().getTime()-AuthAction.getExpires()>=6000*1000){
            //   requestRefreshToken().then(type=>{
            //     type==1?next():next({path: '/login'})
            //   })
            // }
        } else {
            next({
                path: '/login'
            })
        }
    }
    return next()
})

router.afterEach(route => {
    NProgress.done()
})

export default router;