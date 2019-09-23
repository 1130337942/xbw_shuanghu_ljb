export default {
    namespaced: true,

    state: {
        navMenu: [{
            title: '订单管理',
            index: '/order',
            // icon:'el-icon-location',            
            icon: 'iconfont icon-dingdanguanli',
            children: [{
                title: '订单列表',
                index: '/order/list',
                // componentName:'newsCenter_plate',
                leaf: true
            }]
        }, {
            title: '商品管理',
            index: '/commodity',
            // icon:'el-icon-location',
            icon: 'icon-shangpinguanli iconfont',
            children: [{
                title: '商品列表',
                index: '/commodity/list',
                // componentName:'newsCenter_plate',
                leaf: true
            }
                /*,{
                    title:'商品分类',
                    index:'/commodity/classis',
                    // componentName:'newsCenter_plate',
                    leaf:true
                    }*/
            ]
        }, {
            title: '资源管理',
            index: '/resources',
            icon: 'el-icon-upload',
            children: [{
                title: '图片列表',
                index: '/resources/imageList',
                leaf: true
            }
                // ,{
                //     title:'视频列表',
                //     index:'/resources/videoList',
                //     leaf:true
                // }
            ]
        }],
    },

    getters: {
        getNavMenuData(state) {
            return state.navMenu;
        }
    },

    mutations: {
        changeAccount(state, data) {
            state.account = data;
        },
        changePassword(state, data) {
            state.password = data;
        },
        changePhone(state, data) {
            state.phone = data;
        }
    },

    actions: {

    }
}