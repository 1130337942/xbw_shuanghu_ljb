<template>
    <el-container class="mainHome">
        <el-aside style="width:auto">
            <div class="aside-header"><!--寻宝网 - 商户端--></div>
            <el-menu 
                background-color="#323232"
                active-text-color="#7cd8a9"
                text-color="#fff"
                :default-active="$route.path"
                :collapse="isCollapse"
                class="el-menu-vertical-demo"
                mode="vertical"
                :router="true"
            >
                <!-- <nav-menu v-for="item in getNavMenuData"
                    :key="item.index"
                    :navData="item"
                /> -->
                <!-- <template v-for="item in getNavMenuData">
                    <el-menu-item v-if="item.leaf" :index="item.index" :key="item.index">
                        <i :class="item.icon" v-if="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </el-menu-item>
                    <nav-submenu v-else :navData="item" :key="item.index"/>
                </template> -->
                <el-submenu index="/order">
                    <template slot="title">
                        <i class="iconfont icon-dingdanguanli"></i>
                        <span>{{'订单管理'}}</span>
                    </template>
                    <el-menu-item index="/order/list"><span slot="title">{{'订单列表'}}</span></el-menu-item>
                </el-submenu>
                <el-submenu index="/commodity">
                    <template slot="title">
                        <i class="icon-shangpinguanli iconfont"></i>
                        <span>{{'商品管理'}}</span>
                    </template>
                    <el-menu-item index="/commodity/list"><span slot="title">{{'商品列表'}}</span></el-menu-item>
                </el-submenu>
                <el-submenu index="/resources">
                    <template slot="title">
                        <i class="el-icon-upload"></i>
                        <span>{{'资源管理'}}</span>
                    </template>
                    <el-menu-item index="/resources/imageList"><span slot="title">{{'图片列表'}}</span></el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container style="background-color:#e8e8e8;">
            <el-header class="main-header">
                <main-header @collapse="onCollapse" :userName="getUserInfo.account"/>
            </el-header>
            <el-main class="home-main" :class="home_mainCls">
                <!-- <el-scrollbar style="height:100%;width:100%" > -->
                    <router-view />
                <!-- </el-scrollbar> -->
            </el-main>
        </el-container>
    </el-container>   
</template>
<script>
// import NavMenu from './navMenu';
// import NavSubmenu from './submenu';
import MainHeader from './mainHeader';
import { getUserInfo } from '@/api/auth';
import { mapGetters, mapMutations, mapActions } from 'vuex';
// import NavMenu from './navMenu'
export default {
    name:'mainHome',
    components:{MainHeader,/*NavMenu,NavSubmenu*/},
    data(){
        return {
            isCollapse:true,
            home_mainCls:'',
        }
    },
    computed: {
        ...mapGetters('home',['getNavMenuData']),
        ...mapGetters(['getUserInfo'])
    },
    watch:{
        '$route.fullPath':{
            handler:function(to,from){
                this.home_mainCls = (to==='/home'?'merchant_home':'');
                
            },
            immediate:true,
        },
        '$store.state.userInfo.application_status':{
            handler:function(val,oldVal){
                setTimeout(() => {
                    // if(val===-2){
                    //     this.$confirm('您还未申请成为商家, 是否前往申请?', '提示', {
                    //         confirmButtonText: '去申请',
                    //         cancelButtonText: '再想想...',
                    //         type: 'info'
                    //     }).then(()=>{
                    //         this.$router.replace('/merchantApply');
                    //     }).catch(()=>{})
                    // }else if(val===0){
                    //     this.$confirm('您的申请未通过, 是否查看详情?', '提示', {
                    //         confirmButtonText: '去查看',
                    //         cancelButtonText: '取消',
                    //         type: 'warn'
                    //     }).then(()=>{
                    //         this.$router.replace('/merchantApply');
                    //     }).catch(()=>{})
                    // }
                }, 500);
            },
            immediate:true,
        }
    },
    created(){
        console.log(this.getNavMenuData)
        this.getUserInfoData();
        // getUserInfo({application:1}).then(res=>{
        //     this.uploadUserInfo(res);
        //     if(res.application_status===-2){
        //         this.$confirm('您还未申请成为商家, 是否前往申请?', '提示', {
        //             confirmButtonText: '去申请',
        //             cancelButtonText: '再想想...',
        //             type: 'info'
        //         }).then(()=>{
        //             this.$router.replace('/merchantApply');
        //         }).catch(()=>{})
        //     }else if(res.application_status===0){
        //         this.$confirm('您的申请未通过, 是否查看详情?', '提示', {
        //             confirmButtonText: '去查看',
        //             cancelButtonText: '取消',
        //             type: 'warn'
        //         }).then(()=>{
        //             this.$router.replace('/merchantApply');
        //         }).catch(()=>{})
        //     }
        // }).catch(err=>console.log(err))
    },
    methods:{
        onCollapse(){
            return this.isCollapse=!this.isCollapse
        },
        // ...mapMutations(['uploadUserInfo']),
        ...mapActions(['getUserInfoData'])
    }

}
</script>
<style lang="less">
@import url('../../assets/css/common.less');
@import url('../../assets/css/home.less');
</style>
