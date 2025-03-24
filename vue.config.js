const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
 
    

    devServer: {
        proxy: {
            "/": {
                target: 'http://elrdev.glims.cc',  // 代理跨域目标接口，从.env.xxx中获取
                changeOrigin: true,
                bypass: function(req, res, proxyOptions) {
                    // 在源代码中找info级别的日志，啥都没有。只能自己输出最终请求地址
                    let now = new Date();
                    if(req.url.startsWith('/api') ||
                        req.url.startsWith('/file') ||
                        req.url.startsWith('/oauth') ||
                        req.url.startsWith('/token-bridge')){
                        console.log(now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '.' + now.getMilliseconds()
                            + ' 通过代理请求: ', proxyOptions.target + req.url);
                    } else {
                        // 不适用代理
                        return req.url
                    }
                }
            },
        }
    },





      
}
