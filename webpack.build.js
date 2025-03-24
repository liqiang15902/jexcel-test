let path = require('path');
let webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: ['./src/export.js'],
    mode:"development",
    output: {
        path: path.resolve(__dirname, './dist'), //必须配置这行代码，否则删除不掉dist中之前存在的js文件(写法不止一种)
        filename: './index.js',
        libraryTarget: "umd",   // 兼容所有用法的打包
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },{
            test: /\.vue$/,
            loader: 'vue-loader'
            },
            {
                test: /\.(png|jpg)$/,   //配置css中的图片，html中的图片示例在下面
                loader: 'url-loader?limit=8192'//图片被打包在主目录下
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.join(__dirname, 'src')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin(
            [{ from: './src', to: 'src' },
                { from: './doc', to: 'doc' },
                { from: './package.json', to: 'package.json'},
                { from: './package.json', to: 'package.json'},
                { from: './src/components/jexcel/jexcel.css', to: 'jexcel.css'}]
        ),
        new VueLoaderPlugin()
    ]
}
