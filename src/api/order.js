import axios from './axios';

export function getOrderList(params){
    return axios({
        method:'get',
        url:'business/order/list/',
        params
    })
}
export function getOrderInfo(params){
    return axios({
        method:'get',
        url:'business/order/info/',
        params
    })
}