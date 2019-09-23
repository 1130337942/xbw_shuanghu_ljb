import Cookies from 'js-cookie'
import axios from './axios'

// 设置token
export function getToken () {
  return Cookies.get('merchantToken')
}

export function getUserInfo(params) {
  return axios({
    method:'get',
    url:'account/info/',
    params
  })
}

 /**
 * 
 * @param {String} token 存入的token
 * @param {Number,String} expires  有效期时间  /天
 */
export function setToken (token,expires) {
  return Cookies.set('merchantToken', token , {expires: expires})
}

export function removeToken () {
  return Cookies.remove('merchantToken')
}

// 设置token过期时间
export function getExpires () {
  return Cookies.get('expires')
}
 
export function setExpires (expires) {
  return Cookies.set('expires', expires )
}

export function removeExpires () {
  return Cookies.remove('expires')
}

// 设置oss的token
export function getOssToken () {
  return Cookies.get('ossTokenMerchant')
}

export function setOssToken (token) {
  return Cookies.set('ossTokenMerchant', token)
}

export function removeOssToken () {
  return Cookies.remove('ossTokenMerchant')
}

export function getSourceList (params) {
  return axios({
    method:'get',
    url:'source/list/',
    params:{
        ...params
    }
  })
}
export function delRecourse (params) {
  return axios({
    method:'delete',
    url:'source/delete/',
    params
  })
}

