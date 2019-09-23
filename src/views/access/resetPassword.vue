<template>
    <div class="access-children-container">
        <el-form class="resetPassword-form" :model="rulesForm" :rules="rules" ref="rulesForm">
            <div class="resetPassword-input-box">
                <el-form-item prop="account">
                    <el-input v-model="rulesForm.account" placeholder="账号" :maxlength="20">
                        <span slot="append">{{rulesForm_account+'/'+20}}</span>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="rulesForm.password" placeholder="密码" :maxlength="24">
                        <span slot="append">{{rulesForm_password+'/'+24}}</span>
                    </el-input>
                </el-form-item>
                <el-form-item prop="passwordAgain" :rules="pswAgainRules">
                    <el-input type="password" v-model="passwordAgain" placeholder="确认密码"></el-input>
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
            </div>
            <el-button class="resetPassword-button" @click="onSubmitClick">重置密码</el-button>
            <!-- <div class="toLogin">
                <el-button type="text" class="login_bottom_btn" @click="onLoginClick">立刻登陆</el-button>
            </div> -->
            <el-row class="toLogin">
                <el-col :span="16" class="reset-login">
                    <span  @click="onLoginClick">已有账号,立刻登陆</span>
                    <div  @click="onLoginClick" class="resst-icon el-icon-arrow-right"></div>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { sendCode , resetPassWord } from '@/api/access';
import { mapMutations } from 'vuex';
export default {
    name:'resetPassword',
    data(){
        const {phone:phoneRules,account,passWord} = this.$rulers
        return {
            rulesForm:{
                account:'',
                password:'',
                code:''
            },
            passwordAgain:'',
            verification:0,
            accessType:'account', //phone 手机号 || account 账号
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

            
            verification:false,
            verificationLoading:false,
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
        accessChange(){
            return this.$store.state.access.account
        }
    },
    created(){
        this.rulesForm.account = this.accessChange;
    },
    methods: {
        onLoginClick(){
            this.changeAccount(this.rulesForm.account)
            this.$emit('check','login')
        },
        onCodeClick(){
            let account = this.rulesForm.account;
            this.verificationLoading = true;
            this.$refs['rulesForm'].validateField('account',(msg)=>{
                if(!msg){
                    sendCode({account},'reset_password').then(res=>{
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
        onSubmitClick(){
            let params = this.rulesForm;
            this.$refs['rulesForm'].validate()
            .then(()=>resetPassWord(this._filterParams(params)))
            .then(res=>{
                this.$message.success('密码重置成功!');
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
</style>
