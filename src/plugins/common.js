

import areaSelect from '@/components/areaSelect';

export default {
    install(Vue,option){

        /**
         * 公共属性:  $+属性名
         * 公共方法:  _+方法名
         */
        Vue.prototype.$rulers = {
            account(rules,value,callback){
                if(value.trim()===''){
                    callback(new Error('请输入用户名账户'))
                }else if(value.length<6){
                    callback(new Error('账户字符数不能少于6个'))
                }else{
                    callback();
                }
            },
            passWord(rules,value,callback){
                if(value.trim()===''){
                    callback(new Error('请输入密码'))
                }else if(value.length<6){
                    callback(new Error('密码字符数不能少于6个'))
                }else {
                    callback();
                }
            },

            phone(rules,value,callback){
                if((value.trim())===''){
                    callback(new Error('请输入手机号码'));
                }else if(!(/^1[3456789]\d{9}$/.test(value))){
                    callback(new Error('请输入正确的手机号码'));
                }else{
                    callback();
                }
            },
            
            idcard(rules,value,callback){
                if((value.trim())===''){
                    callback(new Error('请输入身份证号码'));
                }else if(!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value))){
                    callback(new Error('请输入正确的身份证号码'));
                }else{
                    callback();
                }
            },

            textTrim(rules,value,callback){
                if((value.trim())===''){
                    callback(new Error('该项为必填项'));
                }else{
                    callback();
                }
            }
        },

        Vue.prototype._replaceUrl = function (url){
            return url.replace(/^http(s)?:\/\/(.*?)\//g,'/');
        };
        
        Vue.prototype.$domainUrl = 'https://app-img.xunbaowang.net';
        /**
         * 是视频首帧图片后缀
         */
        Vue.prototype.$lastVideoUrl = '?x-oss-process=video/snapshot,t_10000,m_fast';
        
        /**
         * @method 参数过滤
         * @param {Object} 过滤参数 
         * @param {Object,undefind} 补充参数 
         */
        Vue.prototype._filterParams = function (params,other={}){
            let ret = {
                ...other
            }            ;
            for(let i in params){
                if(params[i]||params[i]===0){
                    ret[i] = params[i];
                }
            }
            return ret
        };


        /**
         * 地区选择组件
         */
        Vue.component('areaSelect',areaSelect)
    }
}