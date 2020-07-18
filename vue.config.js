// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 运行环境
const env = process.env.NODE_ENV === 'production' && process.env.VUE_APP_MODE === 'production' ? 'production' : 'development';
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

const Timestamp = new Date().getTime();  //当前时间为了防止打包缓存不刷新，所以给每个js文件都加一个时间戳
module.exports = {
    // 基本路径
    // publicPath: env === 'production' ? 'http://static.aitifen.cn/jiaoshi/' : '/',
    // 输出目录
    // outputDir: 'dist',
    // 静态文件目录
    assetsDir: 'static',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,

    configureWebpack: {
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
            filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
            chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
        },
    },
    // css 配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    lintOnSave: process.env.NODE_ENV !== 'production',
    devServer: {
        open: true,
        port: 9000,
        overlay: {
            warnings: false,
            errors: true
        },
        /*
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3003/mock',
                chengeOrigin: true,
                    secure: false,
                pathRewrite: {
                  '^/mock': 'mock'
                }
              }
        }
        */
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                externals: {
                    moment: 'moment',
                    echart: 'echarts',
                    wx: 'weixin-js-sdk'
                },
                plugins: [
                    new CompressionWebpackPlugin({
                        filename: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                        threshold: 10240,
                        minRatio: 0.8
                    })
                ]
            }
        }
    },
    chainWebpack: config => {
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
    }
}
