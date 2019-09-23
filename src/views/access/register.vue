<template>
    <div class="access-children-container">
        <!-- <div class="register-title">注册</div> -->
        <el-form class="register-form" ref="rulesForm" :model="rulesForm" :rules="rules" :status-icon="false"> 
            <el-form-item prop="account">
                <el-input v-model="rulesForm.account" placeholder="账号" :maxlength="20" :minlength="6">
                    <span slot="append">{{rulesForm_account+'/'+20}}</span>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="rulesForm.password" placeholder="密码" :maxlength="24" :minlength="6">
                    <span slot="append">{{rulesForm_password+'/'+24}}</span>
                </el-input>
            </el-form-item>
            <el-form-item prop="passwordAgain" :rules="pswAgainRules">
                <el-input type="password" v-model="passwordAgain" placeholder="确认密码" :maxlength="24"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input v-model="rulesForm.phone" placeholder="手机号码" ></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="rulesForm.code" placeholder="验证码">
                    <el-button 
                        slot="append" 
                        class="verification" 
                        :disabled="verification||verificationLoading?true:false"
                        @click="onCodeClick"
                        :icon="verificationLoading?'el-icon-loading':''"
                    >{{verificationText}}</el-button>
                </el-input>
            </el-form-item>
            <el-button class="register-button" @click="onSubmitClick">注册</el-button>
            <el-row class="toLogin">
                <el-col :push="8" :span="16" class="register-login">
                    <span  @click="onLoginClick">已有账号,立刻登陆</span>
                    <div  @click="onLoginClick" class="register-icon el-icon-arrow-right"></div>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { sendCode , register } from '@/api/access';
import { mapMutations } from 'vuex';
export default {
    name:'reister',
    data(){
        const {phone:phoneRules,account,passWord} = this.$rulers
        return {
            rulesForm:{
                account:'',
                password:'',
                phone:'',
                code:'',
            },
            rules:{
                phone:[{validator:phoneRules,trigger:'blur'}],
                account:[{validator:account,trigger:'blur'}],
                password:[{validator:passWord,trigger:'blur'},],
                code:[{required:true,message:'请输入验证码',trigger:'blur'}]
            },
            pswAgainRules:[{ trigger: 'blur' , validator:(rules,value,callback)=>{
                if(!this.passwordAgain.trim()){
                    callback(new Error('请确认密码'))
                }else if(this.passwordAgain!==this.rulesForm.password){
                    callback(new Error('两次输入的密码不同'))
                }else{
                    callback();
                }
            }}],
            passwordAgain:'',
            verification:false,
            verificationLoading:false,
            accessType:'account', //phone 手机号 || account 账号
            timer:'',
        }
    },
    computed:{
        verificationText(){
            return this.verification===false?'点击获取验证码':(this.verification?this.verification + 's':'重新获取验证码');
        },
        rulesForm_account(){
            return this.rulesForm.account?this.rulesForm.account.length:0
        },
        rulesForm_password(){
            return this.rulesForm.password?this.rulesForm.password.length:0
        },
    },
    methods: {
        onCodeClick(){
            let phone = this.rulesForm.phone;
            this.verificationLoading = true;
            this.$refs['rulesForm'].validateField('phone',(msg)=>{
                if(!msg){
                    sendCode({phone},'register').then(res=>{
                        this.verificationLoading = false;
                        this.verification = 60;
                        this.$message.success('验证码已发送至您的手机')
                        let timer = setInterval(() => {
                            this.verification = this.verification - 1
                            if(this.verification===0){
                                clearInterval(timer);
                            }
                        }, 1000)
                    }).catch((err)=>{console.log(err);this.verificationLoading = false;})
                }else{
                    this.verificationLoading = false;
                }                                                 
            })
        },
        onLoginClick(){
            this.$emit('check','login')
        },
        onSubmitClick(){
            let params = this.rulesForm;
            this.$refs['rulesForm'].validate()
            .then(()=>register(this._filterParams(params)))
            .then(res=>{
                this.$message.success('注册成功!');
                this.changeAccount(params.account)
                this.$emit('check','login');
            })
            .catch(err=>console.log(err))
        },
        ...mapMutations('access',['changeAccount'])
    }
}
</script>
<style lang="less" scoped>
    @import url('../../assets/css/login.less');
    
    // .v-enter{opacity: 0;}
    // .v-enter-to{opacity: 1;}
    // .v-enter-active{transition: 1s;} /*定义过渡时间*/
    // .v-leave{opacity: 1;}
    // .v-leave-to{opacity: 0;}
    // .v-leave-active{transition: 2s;} 
</style>
