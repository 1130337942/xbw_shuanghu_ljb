<template>
    <div class="container">
        <div class="collapse" @click="onCollapseClick">
            <i class="el-icon-menu"></i>
        </div>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item 
                    v-for="(item,index) in breadData"
                    :key="index"
                    :to="item==='首页'?'/home':''"
                >{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="user_setting clearBoth">
            <div class="user_icon">
                <img :src="require('../../assets/images/avatar-mini.jpg')" alt="">
            </div>
            <div class="user_name">
                <el-dropdown @command="ondropDownClick" trigger="click">
                    <span class="el-dropdown-link cursorPoint">
                        {{userName}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                        <el-dropdown-menu slot="dropdown" :divided="true">
                            <el-dropdown-item command="onShopsInfoClick">
                                店铺详情
                                <i class="iconfont icon-dianpuxiangqing1-copy" style="margin-left:28px;"></i>
                            </el-dropdown-item>
                            <el-dropdown-item command="onSignOutClick">
                                退出登陆
                                <i class="iconfont icon-tuichudenglu-copy" style="margin-left:30px;"></i>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </span>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import { signOut } from "@/api/home.js";
import { removeExpires , removeToken } from '@/api/auth'
export default {
    props:{
        userName:String
    },
    data(){
        return {
            bread:[]
        }
    },
    watch:{
        '$route':{
            handler:function(to,form){
                this.bread = to.matched
            },  
            deep:true,
            immediate:true,
        }
    },
    computed:{
        breadData(){
            return this.bread.map(item=>{
                return item.meta.title
            })
        }
    },
    methods:{
        onCollapseClick(){
            this.$emit('collapse')
        },
        ondropDownClick(command){
            this[command]();
        },
        onShopsInfoClick(){
            this.$router.push('/merchantInfo');
        },
        onSignOutClick(){
            signOut().then(res=>{
                removeExpires();
                removeToken();
                this.$message.success('您已退出登陆');
                location.reload()
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../assets/css/home.less');
</style>
