/**
 * axios请求配置
 */
import Vue from 'vue'
import http from 'axios'
import {getToken} from "./HzAuth";
import router from '@/router'
// import jsEncrypt from 'jsencrypt'
import {Decrypt,Encrypt} from "./cryptoJS";
// http默认配置
http.create({
  timeout: 10000,
  headers:{
    // 'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
    'Content-Type' : 'application/json;charset=UTF-8'
  }
});
let _this = Vue.prototype;
// let encrypt = new JSEncrypt();
//请求拦截
http.interceptors.request.use(config => {
  console.log("request" + "请求拦截")
  // let data = config.data;
  // encrypt.setPublicKey('MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyfsCpqSd8rr+2HPi6/h' +
  //   'BpRNpLpn2GfjpLwNz+qS+5WtUAncCzrN0kP9rxRwBCJsbFBbo5isMzCoQxFY9iZgi4UAK2my9nRasa/nKt76je4ht8' +
  //   'eFyqqQd/ZCLtTPdAZgzK+Es9iU2TwDH9vXp/MEZgz7dHE93pPKk293ay0brziIi8+cnxCVrEQM456GQdoqrJOOb16DO18DUNoq' +
  //   '/rNdXk0XjLxxsGC5sEzGkUYLebPLC7RWN1d4kAgMYJrAKRQvZRYZeDxWFuz5G/R6aFcRd6giCaleOvvHU4cOhjosbc9npCUpN17lWBRURX8iu/Io/hsEdbB1EDx49eSyiGq3xJQIDAQAB');
  console.log(Encrypt(JSON.stringify(config.data)));
  config.data = Encrypt(JSON.stringify(config.data));
  console.log(Decrypt(config.data));
  config.headers['Content-Type'] = "application/json;charset=UTF-8";
  // console.log(config)
  //   if (getToken()) {
  //     //每个http header都加上
  //     config.headers['Authorization'] = getToken();
  //     config.headers['system_current_manage_id'] = sessionStorage.getItem('manageId');
  //     config.headers['Content-Type'] = "application/json;charset=UTF-8";
  //   }else {
  //     // _this.$message({message:'您还没有登录或登录已过期，请重新登录',type:'error'});
  //     router.push('/login');
  //   }
//判断是否存在token，即判断用户是否登录，如果存在的话，则每个http header都加上ticket
  return config;
}, error => {
  return Promise.reject(error);
});
//响应拦截
http.interceptors.response.use(response => {
  response.data = JSON.parse(Decrypt(response.data));
  console.log("response 拦截")
  if(response.status === 200){
    switch (response.data.code){
      case '0':
        if(response.config.method === 'post' && response.data.code === '0'){
          _this.$message({message:'操作成功',type:'success'});
        }
        break;
      case '-1':
        _this.$message({message:response.data.desc,type:'waring'});
        break;
      case '-2':
        _this.$message({message:response.data.desc,type:'waring'});
        router.push('/Login');
        break;
      case '-3':
        _this.$message({message:response.data.desc,type:'waring'});
        router.push('/Login');
        break;
    }
  }else {
    _this.$toast({message:'请求异常，请重试'});
}
  return response;
  },error => {
  console.log(error)
  switch (error.response.status){
    case 500:
      _this.$message({message: '服务端异常，请联系技术支持！',type:'error'});
      break;
    case 503:
      _this.$message({message: '系统维护中，请稍后重试！',type:'error'});
      break;
    case 504:
      _this.$message({message: '网络错误,请联系管理员！',type:'error'});
      // router.push('Login');
      break;
    case 404:
      _this.$message({message: '系统繁忙，稍后重试！',type:'error'});
      break;
    default:
      _this.$message({message: '系统异常，请稍后重试',type:'error'});
      break;
  }
  return Promise.reject(error.response)
});

export default http;
