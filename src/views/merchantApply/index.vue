<template>
    <div class="info_box">
        <div v-if="getUserInfo.application_status===-2">
            <div class="title">申请商家</div>
            <div class="merchant_type widthFit">
                <el-row :gutter="20">
                    <el-col :span="12" class="text_center">
                        <div 
                            class="personal inline_block cursor_point" 
                            @click="onCheckClick('personal')"
                            :style="check==='personal'?'box-shadow: 0 2px 12px 0 rgba(0,0,0,.45);':''"
                        >
                            <div class="merchant_icon"></div>
                            <el-button type="primary" @click.stop="onApplyClick('personal')">申请个人商家<!-- <i class="el-icon-d-arrow-right"></i> --></el-button>
                        </div>
                    </el-col>
                    <el-col :span="12" class="text_center">
                        <div 
                            class="enterprise inline_block cursor_point" 
                            @click="onCheckClick('enterprise')"
                            :style="check==='enterprise'?'box-shadow: 0 2px 12px 0 rgba(0,0,0,.45);':''"
                        >
                            <div class="merchant_icon"></div>
                            <el-button type="success" @click.stop="onApplyClick('enterprise')">申请企业商家<!-- <i class="el-icon-d-arrow-right"></i> --></el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="on_audit" v-if="getUserInfo.application_status===-1">
            <div class="audit_icon text_center">
                <img :src="require('../../assets/images/on_audit.png')" alt="">
            </div>
            <div class="apply_text">
                您已成功提交商家申请，将于5个工作日内完成审核……
            </div>
            <div class="apply_back text_center">
                    <router-link tag="div" :to="applyRouter" style="display:inline-block;margin-left:10px;">
                <el-button type="info">
                        <i class="el-icon-document"></i>
                        查看申请详情
                </el-button>
                    </router-link>
                <router-link tag="div" to="/home" style="display:inline-block;margin-left:10px;">
                    <el-button type="primary">
                        <i class="iconfont icon-shouye"></i>
                        返回首页
                    </el-button>
                </router-link>
            </div>
        </div>
        <div class="err_audit" v-if="getUserInfo.application_status===0">
            <div class="audit_icon text_center">
                <img :src="require('../../assets/images/err_audit.png')" alt="">
            </div>
            <div class="apply_text">
                您的账户资料审核未通过！<br/>
                审核未通过原因：
            </div>
            <div class="err_text text_left">
                <p>{{err_audit}}</p>
            </div>
            <div class="apply_back text_center">
                <el-button type="warning">
                    <router-link tag="div" :to="applyRouter">
                        <i class="el-icon-edit-outline"></i>
                        重新提交申请
                    </router-link>
                </el-button>
                <!-- <el-button type="primary">
                    <router-link tag="div" to="/home">
                        <i class="iconfont icon-shouye"></i>
                        返回首页
                    </router-link>
                </el-button> -->
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
    data(){
        return {
            check:'',
            merchantType:'',
            err_audit:``
        }
    },
    computed:{
        applyRouter(){
            console.log(this.$store.state.userInfo.genre)
           return this.$store.state.userInfo.genre===1?'/merchantApply/personal':'/merchantApply/enterprise';
        },
        ...mapGetters(['getUserInfo']),
    },
    created(){
        console.log(this.getUserInfo);
    },
    methods:{
        onCheckClick(type){
            this.check = type;
        },
        onApplyClick(type){ //提交申请
            console.log('apply',type);
            this.$router.push(`/merchantApply/${type}`)
        },
        onAuditResubmit(){ //重新提交
            this.$router.push(`/merchantApply/${type}`)
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../assets/css/merchantApply.less');
.info_box {
    .on_audit,.err_audit {
        width: 100%;
        height: 100%;
        .audit_icon img {margin: 20px auto;}
        .apply_back { margin: 4% auto; }
        .err_text { 
            width: 80%;
            margin: 30px auto;
            font-size: 20px;
            color: #303133;
            text-indent: 60px;
            line-height: 35px;
        }
        .apply_text {
            width: 60%;
            margin: 0 auto;
            text-align:center;
            font-size: 30px;
            color: #606266;
            line-height: 40px;
        }
    }
    .title {
        text-align: center;
        font-size: 30px;
        line-height: 80px;
        font-family: "PingFang SC";
    }
    .merchant_type {
        .personal {
            border: 1px solid #E4E7ED;
            border-radius: 10px;
            padding:3vw;
            .merchant_icon {
                background: url('../../assets/images/personal.png') no-repeat;
            }
        }
        .enterprise {
            border: 1px solid #E4E7ED;
            border-radius: 10px;
            padding:3vw;
            .merchant_icon {
                background: url('../../assets/images/enterprise.png') no-repeat;
            }
        }
        .personal:hover,.enterprise:hover { box-shadow: 0 2px 12px 0 rgba(0,0,0,.2); }
        .personal ,.enterprise {
            transition: all .2s linear ;
            .merchant_icon{
                background-size: 100%;
                width: 18vw;
                height: 18vw;
                max-height: 264px;
                max-width:264px;
                margin-top: 4vw;
            }
            .el-button {
                margin-top: 30px;
            }
        }
    }
}
</style>
