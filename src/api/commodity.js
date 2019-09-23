import axios from "./axios";

export function getClassisData (params){
    return axios({
        method:'get',
        url:'business/commodity/genre/list/',
        params
    })
}
export function getCommoditylist (params){
    return axios({
        method:'get',
        url:'business/commodity/list/',
        params
    })
}
export function getCommodityInfot (params){
    return axios({
        method:'get',
        url:'business/commodity/info/',
        params
    })
}
export function saveCommodityInfot (params,isEdit){
    return axios({
        method:'post',
        url:`business/commodity/${isEdit?'edit':'add'}/`,
        data:params
    })
}
