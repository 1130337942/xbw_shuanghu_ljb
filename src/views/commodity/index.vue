<template>
    <div>
        <keep-alive :include="includePage" :max="1">
            <router-view />
        </keep-alive>
    </div>    
</template>
<script>
export default {
    data(){
        return {
            includePage:['commodity_list','commodity_classis']
        }
    }
}
</script>
<style lang="less" scoped>

</style>
