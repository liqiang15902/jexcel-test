//引入mockjs
const Mock = require('mockjs')
//使用mockjs模拟数据
// eslint-disable-next-line no-unused-vars
Mock.mock('/mock/elselect/options', (req, res) => {//当post或get请求到/api/data路由时Mock会拦截请求并返回上面的数据
    let options = [{
        value: 'AR',
        label: '阿尔法.罗密欧'
    }, {
        value: 'AD',
        label: '奥迪'
    }, {
        value: 'B',
        label: '宝马'
    }, {
        value: 'HD',
        label: '本田'
    }, {
        value: 'PS',
        label: '保时捷'
    }]
    return options
})
