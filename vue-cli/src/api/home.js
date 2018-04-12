import request from '@/utils/request'

export default{
     home(){ // 首页数据请求
        return request('url',{
          // method: 请求方法,
          // patterns：作为路径的数据(数组)，
          // params: query形式的数据,
          // data: bode携带的数据,
          // headers: 头部设置,
        })
     }
}
