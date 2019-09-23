import Vue from 'vue';
import Vuex from 'vuex';

import access from './access';
import home from './home';
import { getUserInfo } from '@/api/auth';
import { getLocation } from '@/api/apply';



Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        'access':access, //登陆 注册 重置密码
        'home':home, //业务面板
    },
    state:{
        userInfo:{},  //商户信息

        area:{   //
          province:[/*{name:'one',id:1,children:[{name:'tow',id:2,leaf:true}]}*/],
          city:{}  
        },
    },
    getters:{
        getUserInfo(state){
            return state.userInfo;
        },
        getApplicationStatus(state){
            return state.userInfo.application_status
        }
    },
    mutations:{
        uploadUserInfo(state,data){
            state.userInfo = data;
        },

        uploadAreaBoth(state,{data,index}){  //直接更新地区联级下的第二级
            state.area.province[index].children = data.map(item=>{ return {...item,leaf:true} });
        },
        uploadAreaProvince(state,data){
            state.area.province = data;
        },
        uploadAreaCity(state,{data,index}){
            state.area.city[index] = data.map(item=>{ return {...item,leaf:true} });
        },
    },
    actions:{
        getUserInfoData({commit,state}){
            getUserInfo({application:1}).then(res=>{
                commit('uploadUserInfo',res)
            }).catch(err=>console.log(err))
        },

        
        /**
         * 更新 地区联级数组 一级  二级 
         * @param {Number,String} parentId 父级id
         * @param {Function} callBack 回调函数
         */
        getArea({commit,state},{parentId,callBack}){
            if(parentId||parentId===0){  //更新二级

                if( !state.area.city[parentId] ){   
                    getLocation({level:2,parent_id:parentId})
                    .then(res=>{
                        let  options = res.map(item=>{
                            return  {...item,leaf:true}
                        })
                        commit('uploadAreaCity',{data:options,index:parentId});
                        callBack?callBack(options):null;
                    }).catch(err=>console.log(err))
                }else{
                    callBack?callBack(state.area.city[parentId]):null
                }

            }else{  //更新一级
                if(state.area.province.length===0){
                    getLocation({level:1})
                    .then(res=>{
                        commit('uploadAreaProvince',  res.map(item=>{
                             return {
                                ...item,
                                children:state.area.city[item.id]||[]
                            } 
                        })  )
                        callBack?callBack():null;
                    }).catch(err=>console.log(err))
                }else{
                    callBack?callBack():null;
                }
            }
        },
        /**
         * 直接更新 地区联级数组的二级 
         * @param {Number,String} parentId 父级id
         * @param {Function} callBack 回调函数
         */
        getAreaBoth({commit,state,dispatch},{parentId,callBack}){

            if(state.area.province.length!==0){
                let index;
                const identical = state.area.province.filter((item,key)=>{
                    item.id===parentId?index=key:null;
                    return item.id===parentId
                })
                if(identical[0].children.length===0){
                    getLocation({level:2,parent_id:parentId})
                    .then(res=>{
                        commit('uploadAreaBoth',{data:res,index});
                        commit('uploadAreaCity',{data:res,index});
                        callBack?callBack(res):null;
                    }).catch(err=>console.log(err))
                }else{
                    callBack?callBack():null;
                }

            }else{
                dispatch('getArea',{callBack(data){
                    dispatch('getAreaBoth',{parentId,callBack})
                }})
            }

        }
    }
})