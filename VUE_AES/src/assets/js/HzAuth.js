/**
 * 鉴权js
 * 声明全局token键，用于存储token的值
 * @type {string}
 * 注意事项：确保key的唯一性
 * 有两种存储方式，1：Cookies，2：sessionStorage
 */
const hzTokenKey = 'hz-token';

/**
 * 登录成功后，设置token
 * @param token 服务端返回的token值
 */
export function setToken(token) {
  sessionStorage.setItem(hzTokenKey, token);
}

/**
 * main.js中全局拦截URL时获取token
 * @returns {string | null}
 */
export function getToken() {
  return sessionStorage.getItem(hzTokenKey);
}

/**
 * 退出登录时，调用remove函数移除token
 */
export function removeToken() {
  return sessionStorage.removeItem(hzTokenKey);
}
