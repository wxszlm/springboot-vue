import axios from '../assets/js/http'

let base = "http://localhost:9095"


// 加密测试
export const create = params =>{return axios.post(`${base}/save`,params)};
export const search = params =>{return axios.get(`${base}/get`,{params:params})};
