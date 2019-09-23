import axios from './axios'

export function resetPassWord(params) {
    return axios({
        url:'account/reset/password/',
        method:'post',
        data:params
    })
}
export function toLoginPassword(params) {
    return axios({
        url:'account/password/sign_in/',
        method:'post',
        data:params
    })
}
export function toLoginCode(params) {
    return axios({
        url:'account/code/sign_in/',
        method:'post',
        data:params
    })
}
export function register(params) {
    return axios({
        url:'account/registered/',
        method:'post',
        data:params
    })
}

export function sendCode(params,type){
    return axios({
        url:`send_code/${type}/`,
        method:'get',
        params
    })
}