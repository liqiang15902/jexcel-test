import {HTTPCaching} from "./cache";
import axios from "axios";

export class HTTP{
    constructor(){
        // 默认的http请求
        this.caching = new HTTPCaching()    // 默认启用缓存，如果需要不启用，将缓存的数量设置为0
    }

    /**
     * 响应get请求
     * @param url
     * @returns {Promise<unknown>|*}
     */
    get(url, headers=null) {
        // 如果有缓存，直接从缓存拉取
        const cachedPromise = this.caching.getCache(url)
        if (cachedPromise) {
            return cachedPromise
        }

        const promise = this._request('GET', url, headers)
        // console.log('get.promise', promise)
        this.caching.appendCache(url, null, promise)
        return promise
    }

    _request (method = 'GET', url = '', headers=null){
        return new Promise((resolve, reject) => {
            axios.request({
                url: url,
                method: method,
                headers: headers
            }).then(response => {
                let responseData = response.data
                resolve(responseData)
            }).catch(e => {
                // console.log('_request.catch', e)
                if(e.response && e.response.status === 401) {
                    throw new Error('登录信息已过期')
                }
                reject(e)
            }).finally(() => {
                // do nothing
            })
        })
    }
}


const http = new HTTP()   // 建议全局用唯一的http实例
export default http
