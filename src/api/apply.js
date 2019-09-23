import axios from './axios';

export function submitApply(params){
    return axios({
        method:'post',
        url:'business/shop/application/',
        data:params
    })
}
export function getaAuditInfo(params){
    return axios({
        method:'get',
        url:'business/application/info/',
        params
    })
}
export function getLocation (params){   
    return axios({
        method:'get',
        url:'area/',
        params
    })
}