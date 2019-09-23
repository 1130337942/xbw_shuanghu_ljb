<template>
    <el-submenu :index="navData.index" :disabled="isDisabled" >
        <template slot="title">
            <i v-if="navData.icon" :class="navData.icon"></i>
            <span>{{navData.title}}</span>
        </template>
        <!-- <template v-for="item in (navData.children)" > -->
            <nav-submenu v-for="items in (!navData.leaf?navData.children:[])" :navData="items" :key="items.index"/>

            <el-menu-item v-for="item in (navData.leaf?navData.children:[])" :index="item.index" :key="item.index">
                <i :class="item.icon" v-if="item.icon"></i>
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
        <!-- </template> -->
    </el-submenu>
</template>
<script>

import { mapGetters } from 'vuex';
export default {
    name:'nav-submenu',
    props:{
        navData:{
            // type:Array/,
            required:true,
        },
    },
    computed:{
        isDisabled(){
            // return false
            return this.getApplicationStatus!==1
        },
        ...mapGetters(['getApplicationStatus'])
    },
    created(){
        console.log('nav for')
    }
}
</script>
<style lang="less" scoped>

</style>