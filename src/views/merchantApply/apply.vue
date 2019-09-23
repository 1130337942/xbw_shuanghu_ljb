<template>
    <div class="heightFit">
        <div class="steps_box">
            <el-steps :active="1">
                <el-step title="店铺信息" icon="el-icon-edit"></el-step>
                <el-step title="开店人基本信息" icon="el-icon-upload"></el-step>
                <el-step title="" icon="el-icon-picture"></el-step>
            </el-steps>
        </div>    
        <div class="applyForm">
            <router-view />
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    created(){  
        console.log(this.$route)
        // this.merchantType = this.$route
    },
    methods:{

    }
}
</script>
<style lang="less" scoped>
.steps_box {
    background: #ffffff;
    padding: 20px;
}
.applyForm {
    // height: calc(100% - 130px);
    margin-top: 30px;
}
</style>
