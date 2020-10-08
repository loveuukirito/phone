module.exports = {
    lintOnSave: false,
    devServer: {
        port: 8080,
        proxy: {/**处理跨域，本地代理转发*/
            '/api': {
                target: 'http://10.10.81.157:8080/',  // 接口域名
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    "^/api": ""
                }
            },
        },
    }
}