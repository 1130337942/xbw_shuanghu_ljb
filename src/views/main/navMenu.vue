<template>
    <component :is="navData.leaf?'el-menu-item':'el-submenu'" :index="navData.index" :disabled="isDisabled">
        <i :class="navData.icon" v-if="navData.leaf&&navData.icon"></i>
        <span slot="title" v-if="navData.leaf">{{navData.title}}</span>

        <template slot="title" v-if="!navData.leaf">
                <i v-if="navData.icon" :class="navData.icon"></i>
                <span>{{navData.title}}</span>
        </template>
        <nav-menu v-for="(item) in (navData.leaf?[]:navData.children)"
            :key="item.index"
            :navData="item"
        />
    </component>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name:'navMenu',
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
<style lang="less">

</style>
