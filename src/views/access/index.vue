<template>
    <div class="container" style="overflow:hidden;">
        <div class="access-log">
            <div>商家管理后台</div>
        </div>
        <div class="access-background">
            <div class="access-children-box">
                <div class="access-children">
                    <!-- 注册 -->
                    <transition-group name="left" mode="out-in" tag="div" class="access-children-item">
                        <register v-if="type==='register'" @check="onTypecheck" :key="'register'"/>  
                    </transition-group>
                    <!-- 登陆 -->
                    <transition-group name="login" mode="out-in" tag="div" class="access-children-item">
                        <login v-if="type==='login'" @check="onTypecheck" :key="'login'" :defaultAccount="account"/>
                    </transition-group>
                    <!-- 重置密码 -->
                    <transition-group name="right" mode="out-in" tag="div" class="access-children-item">
                        <resetPassword  v-if="type==='resetPassword'" @check="onTypecheck" :key="'resetPassword'"/>
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import login from './login';
import register from './register';
import resetPassword from './resetPassword';
import { mapMutations } from 'vuex';
export default {
    components:{    
        login,register,resetPassword
    },
    data(){
        let {phone} = this.$rulers;
        return {
            type:'login',
            account:'',
        }
    },
    computed:{
        verificationText(){
            return this.verification + 's';
        },
        mainTitle(){
            let title = '登陆';
            switch (this.type) {
                case 'register':
                    title="注册";
                    break;
                case 'resetPassword':
                    title="重置密码";
                    break;
            }
            return title
        },
    },
    methods: {
        onCheckLoginClick(){
            this.accessType = (this.accessType==='account'?'phone':'account');
        },
        onTypecheck(type){
            this.type = type
        },
        ...mapMutations('access',[])
    }
}
</script>
<style lang="less" scoped>
    @import url('../../assets/css/login.less');
    
    .left-enter-active, .left-leave-active ,
    .right-enter-active, .right-leave-active 
    ,.login-enter-active, .login-leave-active {
        transition: all .5s;
    }
    .left-enter,.right-leave-to,.login-leave-to {
      opacity: 0;
    }
    .right-enter,.login-enter,.left-leave-to {
      opacity: 0;
    }
    .left-enter {
        transform: translateX(-100px);
    }
    .left-enter-to,.left-leave,
    .right-enter-to,.right-leave ,
    .login-enter-to,.login-leave {
        transform: translateX(0px);
    }
    .left-leave-to {
        transform: translateX(-100px);
    }
    
    .right-enter,.right-leave-to ,
    .login-enter,.login-leave-to {
        transform: translateX(100px);
    }
</style>
