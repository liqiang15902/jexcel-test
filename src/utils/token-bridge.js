export function getTokenBridgeUrl(url, tokenBridge){
    /**
     * python后台专用，增加token-bridge，使图片能接受权限控制
     */
    if (!url.toUpperCase().startsWith('HTTPS:') && !url.toUpperCase().startsWith('HTTP:')) return _joinUrlPath(tokenBridge, url)
    let npos = url.indexOf('/', 'HTTPS:'.length + 2)
    if (npos === -1) {
        // 异常
        return url
    }
    let urlHead = url.slice(0, npos)
    let urlEnd = url.slice(npos)
    return _joinUrlPath(_joinUrlPath(urlHead, tokenBridge), urlEnd)
}

function _joinUrlPath(s1, s2) {
    let ss1 = s1
    let ss2 = s2
    // 把ss1和ss2改成方便拼接的格式
    if (!ss1.startsWith('/') && !ss1.toUpperCase().startsWith('HTTPS:') && !ss1.toUpperCase().startsWith('HTTP:')) ss1 = '/' + ss1
    if (ss1.endsWith('/') && ss2.startsWith('/')) return ss1 + ss2.substr(1)
    if (!ss1.endsWith('/') && !ss2.startsWith('/')) return ss1 + '/' + ss2
    return ss1 + ss2
}

export function removeUrlTokenBridge(url, tokenBridge){
    /**
     * python后台专用，增加token-bridge，使图片能接受权限控制
     */
    let ss = tokenBridge
    if (!ss.startsWith('/') && !ss.endsWith('/')) ss = ss + '/'
    if (ss.startsWith('/') && ss.endsWith('/')) ss = ss.slice(1)
    return url.replace(ss, '')
}
