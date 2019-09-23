


export default {
    namespaced:true,

    state:{
      account:''  ,
      password:'',
      phone:'',
    },

    getters:{
        
    },

    mutations:{
        changeAccount(state,data){
            state.account = data; 
        },
        changePassword(state,data){
            state.password = data; 
        },
        changePhone(state,data){
            state.phone = data;
        }
    },

    actions:{

    }
}