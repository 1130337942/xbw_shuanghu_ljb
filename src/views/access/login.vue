<template>
   <div class="access-children-container">
        <el-form class="login-form" :model="rulesForm" :rules="rules" ref="rulesForm" size="medium" :inline-message="false">
            <el-row>
                <el-col :span="12" class="login-type" :class="accessType==='account'?'is-active':''">
                    <span @click="onCheckLoginClick">账号登陆</span>
                </el-col>
                <el-col :span="12" class="login-type" :class="accessType==='phone'?'is-active':''">
                    <span @click="onCheckLoginClick">手机号登陆</span>
                </el-col>
            </el-row>
            <el-form-item prop="account" style="margin-bottom:18px">
                <el-input  v-model="rulesForm.account" placeholder="账号" :maxlength="20"  @keyup.enter.native="onloginClick">
                    <!-- <span slot="append">{{rulesForm_account+'/'+20}}</span> -->
                    <span slot="prefix"><i class="icon-11 iconfont"></i></span>
                </el-input>
            </el-form-item>
            <div class="login-input-box">
                <transition-group name="fade" mode="out-in" tag="div" class="posi">
                    <div v-if="accessType==='account'" key="account">
                        <el-form-item prop="password">
                            <el-input  type="password" v-model="rulesForm.password" placeholder="密码" :maxlength="24"  @keyup.enter.native="onloginClick">
                                <!-- <span slot="append">{{rulesForm_password+'/'+24}}</span> -->
                                <span slot="prefix"><i class="icon-mima iconfont"></i></span>
                            </el-input>
                        </el-form-item>
                    </div>
                </transition-group>
                <transition-group name="fade" mode="out-in" tag="div" class="posi">
                    <div v-if="accessType==='phone'" key="phone">
                        <!-- <el-form-item prop="phone">
                            <el-input v-model="rulesForm.phone" placeholder="手机号码"></el-input>
                        </el-form-item> -->
                        <el-form-item prop="code">
                            <el-input v-model="rulesForm.code" placeholder="验证码"  @keyup.enter.native="onloginClick">
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
                </transition-group>
            </div>
            <el-button class="login-button" @click="onloginClick" :loading="isLoginLoading">登陆</el-button>
            <el-row>
                <el-col :span="8">
                    <div class="forget-password">
                        <el-button type="text" class="login_bottom_btn" @click="toResetClick">忘记密码?</el-button>
                    </div>
                </el-col>
                <el-col :span="16" class="login-register">
                    <span @click="onRegisterClick">还没账号,去注册</span>
                    <div @click="onRegisterClick" class="login-register-icon el-icon-arrow-right"></div>
                </el-col>
            </el-row>
        </el-form>
   </div>
</template>
<script>
import { toLoginPassword , toLoginCode , sendCode } from '@/api/access';
import {setToken} from '@/api/auth.js'
import { mapMutations } from 'vuex';
import { format } from 'path';
export default {
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
            verification:false,
            verificationLoading:false,
            accessType:'account', //phone 手机号 || account 账号
            
            isLoginLoading:false,
        }
    },
    watch:{
        accessChange:function(val,oldVal){
            if(val!==oldVal){
                this.rulesForm.account = val;
            }
            this.$refs['rulesForm'].clearValidate()
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
        },
    },
    created(){
        this.rulesForm.account = this.accessChange;
    },
    methods: {
        onCodeClick(){
            let phone = this.rulesForm.phone;
            let account = this.rulesForm.account;
            this.verificationLoading = true;
            this.$refs['rulesForm'].validateField('account',(msg)=>{
                if(!msg){
                    sendCode({account:'chestunttree'},'sign_in').then(res=>{
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
        onCheckLoginClick(){
            this.rulesForm.code = '';
            if(this.accessType==='account'){
                this.accessType = 'phone'
                this.rulesForm.password = '';
            }else{
                this.rulesForm.code = '';
                this.accessType = 'account'
            }
        },
        onloginClick(){
            let params = this._filterParams(this.rulesForm);
            this.$refs['rulesForm'].validate()
            .then(()=>{
                this.isLoginLoading = true;
                return this.accessType =='account'?toLoginPassword(params):toLoginCode(params);
            })
            .then(res=>{
                this.isLoginLoading = false;
                this.$message.success('登陆成功');
                setToken(res.token,2);
                this.$router.replace('/home')
            })
            .catch((err)=>console.log(err))
        },
        onRegisterClick(){
            this.$emit('check','register')
        },
        toResetClick(){
            this.changeAccount(this.rulesForm.account)
            this.$emit('check','resetPassword')
        },
        ...mapMutations('access',['changeAccount']),
    }
}
</script>
<style lang="less" scoped>
    @import url('../../assets/css/login.less');
    @import url('../../assets/iconfont/iconfont.css');
</style>
