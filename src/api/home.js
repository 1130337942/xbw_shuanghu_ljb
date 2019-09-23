import axios from './axios';

export function signOut() {
    return axios({
        methods: 'get',
        url: 'account/sign_out/'
    })
}
export function getVistorsData(params) {
    return axios({
        methods: 'get',
        url: 'analysis/merchant/visitor/count/',
        params
    })
}
export function getGoodsVistorsData(params) {
    return axios({
        methods: 'get',
        url: 'analysis/merchant/visitor/count/',
        params
    })
}
// export function post(params) {
//     return axios({
//         methods: 'post',
//         url: 'analysis/merchant/visitor/count/',
//         data: params
//     })
// }

// export function delete(params) {
//     return axios({
//         methods: 'delete',
//         url: 'analysis/merchant/visitor/count/',
//         params
//     })
// }