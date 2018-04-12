import axios from 'axios'
// import router from '@/router'

import {API_PREFIX} from '@/api/apis'; // 这里引入的是代理路径前缀 /api


// 请求拦截
// axios.interceptors.request.use(function(req){
//     // console.log(req)

//     return req;
//  })

// 响应拦截
axios.interceptors.response.use(res => {
   return res;
},error =>{
    // if(error.response.status == 401){
    //     sessionStorage.clear();
    //     router.push({path:'/login',query:{msg:'登录已过期'}})
    // }
    return  Promise.reject(error.response)
})




function createRequestConfig(api,{method, headers,patterns, params, data}){
    let url  = api;
    let methods = method || 'GET'; // 默认get请求
    let header = headers || {};
    // 解析路径匹配参数
    if(patterns && patterns.length){
        for(let i=0; i < patterns.length; i++){
            url = url.replace(`{${i}}`,patterns[i])
        }
    }
    return  axios.request({
        url: API_PREFIX +  url,
        method: methods.toLowerCase(),
        params: params, // GET 请求 (需要注意的是在登录post请求是时使用了)
        data: JSON.stringify(data),
        headers: header,
    });
}

export default function request(api,config = {}){

  const { method, headers ,patterns, params, data} = config;
  //patterns匹配路径参数（数组）， params GET请求参数（对象）, data


  // 配置默认header信息
  axios.defaults.headers.post['ACCEPT'] = 'application/json';
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
  return createRequestConfig(api,{method, headers, patterns, params, data})

}
