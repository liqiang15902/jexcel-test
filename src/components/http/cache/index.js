import equals from 'is-equal-shallow';

class HTTPCache {
    // 一个具体的缓存包
    constructor (url, params, promise) {
        this.url = url
        this.params = params
        this.promise = promise
        this.time = new Date().getTime()
    }
}

export class HTTPCaching { // 缓存管理器
    constructor(cacheSize = 100, cacheTimeout = 3000) {
        this.caches = []    // 已经缓存的缓存
        this.cacheSize = cacheSize // 缓存的请求数
        this.cacheTimeout = cacheTimeout // 缓存超时时间, 毫秒
    }

    clearAll() {
        this.caches.length = 0
    }

    appendCache (url, params, promise) {
        const cache = new HTTPCache(url, params, promise)
        this._clearOutTime()
        // 这里没有验重，因为promise是直接返回的，理论上不会出现重复
        this.caches.push(cache)
    }

    getCache (url, params) {
        this._clearOutTime()
        for (let i = 0, len = this.caches.length; i < len; i++) {
            const cache = this.caches[i]
            if (cache.url === url && equals(cache.params, params)) {
                return cache.promise
            }
        }
        return null
    }

    size() {
        return this.caches.length
    }

    _clearOutTime() {
        const now = new Date().getTime()
        while (this.caches.length > 0) {
            const cache = this.caches[0]
            if (now - cache.time >= this.cacheTimeout || this.caches.length > this.cacheSize) {
                this.caches.shift()
            } else { break }
        }
    }
}
