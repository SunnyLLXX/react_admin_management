/**封装axios请求 */
import axios from 'axios'
import {message} from 'antd'

export default function request(url,data={},method='GET'){
    return new Promise(function(resolve,reject){
        let promise
        method = method.toUpperCase()
        if(method === 'GET'){
            promise = axios.get(url,{params:data})
        }else if(method === 'POST'){
            promise = axios.post(url,data)
        }
        promise.then(function(response){
            resolve(response)
        }).catch(function(error){
            message.error('请求错误:'+error.message)
        })
    })

}