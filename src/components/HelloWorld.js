import jexcel from "@/components/jexcel/jexcel";
import jexcelStyle from "@/components/jexcel/jexcel.css"; // eslint-disable-line no-unused-vars
import {jexcelAbout, jexcelText} from "@/components/jexcel/myextra/langCN"
import {ElInputColumn} from "@/components/jexcel/myextra/ElInputColumn";
import {EltextareaColumn} from "@/components/jexcel/myextra/EltextareaColumn";
import {ElDatePickerColumn} from "@/components/jexcel/myextra/ElDatePickerColumn";
import {ElDateTimePickerColumn} from "@/components/jexcel/myextra/ElDateTimePickerColumn";
import {ElDateTimePicRangeColumn} from "@/components/jexcel/myextra/ElDateTimePicRangeColumn";
import { ElRichText } from "@/components/jexcel/myextra/ElRichText";
import {ElCheckBoxColumn} from "@/components/jexcel/myextra/ElCheckBoxColumn"
import {EditorBase, ElSelectColumn} from "@/export";


import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import {ElImageColumn} from "@/components/jexcel/myextra/ElImageColumn";
import {ElImageColumnMore} from "@/components/jexcel/myextra/ElImageColumnMore";
import {ElLinkColumn} from "@/components/jexcel/myextra/ElLinkColumn";
import { ElAvatarUrlColumn } from "@/components/jexcel/myextra/ElAvatarUrlColumn";
import {whatIsIt} from "@/utils/what-is-it";
import {getChildByNodeName} from "@/utils/element";


export default {
    name: "HelloWorld",
    data() {
        return {
            myCars: [
                [   "Jazz",
                    "<p>11111111111111111111</p><p>2222222222222222222</p>",
                    null,
                    37,
                    null,
                    "2019-02-12 23:23:23",
                    '',
                    '',
                    imageExample,
                    JSON.stringify([]),
                    true,
                    true,
                    "",
                    "#777700",
                    "#777700"
                ],
                ["Civic","<p>Civic</p>", "[\"HD\"]","HD","HD", "2018-07-11 09:34:12","", '["2022-12-08 00:00:00","2023-01-10 00:00:00"]', null, true,true, "$ 4.000,01","", "#007777", "#007777"],
                ["Z4","Z4", "[\"B\",\"AD\"]", "B", "B", "2017-11-24 08:45:34","", "", JSON.stringify([]), false,true, "$ 324.072,58","pic:xxxx", "#700d0d", "#700d0d"],
                [   "Boxter S",
                    "Boxter S",
                    "[\"B\",\"AD\",\"HD\"]",
                    "PS",
                    "PS",
                    "2019-08-24 07:33:35",
                    "",
                    "",
                    JSON.stringify([{url: 'http://elrdev.glims.cc/file/downloads/www/dev/1003/202202/8638d350-9490-11ec-8b37-00163e0e4e24.jpeg'},
                    {url:'http://elrdev.glims.cc/file/downloads/www/dev/1004/202203/c44c396e-a86f-11ec-841f-00163e0e4e24.jpeg'},
                        {url:'http://elrdev.glims.cc/file/downloads/www/dev/1004/202203/eebd4bac-a86f-11ec-8311-00163e0e4e24.jpeg'}]),
                    true,
                    true,
                    "$ 307.839,45",
                    "https://elruat.glims.cc/file/downloads/default/touxiang.png",
                    "#0e0438",
                    ""
                ]
            ],
            jExcelObj: {},
            options: [{
                value: 'AR',
                label: 'Alfa Romeo'
            }, {
                value: 'AD',
                label: 'Audi'
            }, {
                value: 'B',
                label: 'BMW'
            }, {
                value: 'HD',
                label: 'Honda'
            }, {
                value: 'PS',
                label: 'Porshe'
            }],
            myInputTest: 'myInputTestString',
            // 拿到所以单元格上传的所有图片数据
            img:{},
            selectedCell: null, // 选中的单元格
        };
    },
    computed: {
        jExcelOptions() {
            return {
                freezeRows:1, // 固定第一行
                defaultColWidth: 100, // 默认列的宽度
                tableOverflow: true, // 是否开启滑动
                allowInsertRow: true, // 允许插入新行
                allowManualInsertRow: true, // 是否手动插入新行
                allowInsertColumn: true, // 允许插入新列
                allowManualInsertColumn: true, // 是否手动插入列
                allowDeleteRow: true, // 是否允许删除行
                allowDeleteColumn: true, // 是否允许手动删除行
                allowRenameColumn: true, // 是否允许修改行名称
                columnDrag: true, // 允许拖动列
                lazyLoading: true, // 触发下拉加载效果
                freezeColumns: 1, // 禁止左列滚动、
                style: {},
                tableWidth: '1200px',
                tableHeight: null,

                text: jexcelText,   // 中文菜单
                about: jexcelAbout, //  自定义的about菜单
                search:true,
                pagination:2,
                onchange: this.changed,
                onselection: this.onselection,
                onblur: this.onblur,
                data: this.myCars,
                // data: [],
                // contextMenu: function(obj, x, y, e) {
                //     let items = [];
                //     items.push({
                //         title:'自定义右键，console',
                //         onclick:function() {
                //             console.log('点击了自定义右键', obj, x, y, e);
                //         }
                //     });
                //     return items;
                // },
                columns: [
                    //editor 双击的方法
                    {
                        type: "mytext",
                        editor: new ElInputColumn(Vue, this.jExcelObj),
                        title: "ElInputColumn",
                        // type: "text",
                        // title: "Text",
                        width: "100px"
                    },
                    {
                        type: "mytext",
                        editor: new EltextareaColumn(Vue, this.jExcelObj),
                        title: "EltextareaColumn",
                        // type: "text",
                        // title: "Text",
                        width: "100px"},
                    {
                        type: 'mytext',     // 支持快捷键
                        selectedCell: true,
                        editor: new ElSelectColumn(Vue, this.jExcelObj,
                            {placeholder: '选择或者输入一个', multiple: true, allowCreate: true, filterable: true,
                                defaultFirstOption: true, options: this.options},
                            {}),
                        title: "ElSelectColumn复选",
                        width: "200px"
                    },
                    {
                        type: 'mytext',     // 支持快捷键
                        selectedCell: true,
                        editor: new ElSelectColumn(Vue, this.jExcelObj,
                            {placeholder: '选择或者输入一个', multiple: false, allowCreate: false,
                                filterable: false, defaultFirstOption: true},
                            // {url: 'http://elrdev.glims.cc/api/restful/query/system/user/all?in_filter=model.system.user.User.id__user_ids&user_ids.module=model.system.user_position.UserPositi' +
                            //         'on.&user_ids.in_filter=model.system.user_position.UserPosition.position_id__positions&user_ids.positions.module=model.system.position.Position.id&user_ids.positions.equal_filter' +
                            //         '=model.system.position.Position.code__sale&equal_filter=model.system.user.User.state_valid__valid&option=label__name,value__id&order_by=model.system.user.User.id&per_page=300',
                            //         headers:{Authorization: 'Bearer tLjd8jVnGQwgNoYINMygp5yD3JHYGU0EgldofuDM7I'}}
                            {url: '/mock/elselect/options'} // 选项从接口获取
                        ),
                        title: "ElSelectColumn单选",
                        width: "200px"

                    },

                    {
                        type: 'dropdown',     // 支持快捷键
                        selectedCell: true,
                        title: "dropdown",
                        width: "200px",
                        source: this.options.map(item=>({...item, id: item.value, name: item.label}))
                        // source: this.options
                    },
                    {type: "mytext", editor: new ElDatePickerColumn(Vue, this.jExcelObj, {type:"date"}, {valueFormat: 'YYYY-MM-DD HH:mm'}), title: "ElDatePickerColumn", width: "120px"},
                    {type: "mytext", editor: new ElDateTimePickerColumn(Vue, this.jExcelObj, {type:"date"}, {valueFormat: 'YYYY-MM-DD HH:mm'}), title: "ElDateTimePickerColumn", width: "120px"},
                    {type: "mytext", editor: new ElDateTimePicRangeColumn(Vue, this.jExcelObj, {type:"date"}, {valueFormat: 'YYYY-MM-DD HH:mm'}), title: "ElDateTimePicRangeColumn", width: "240px"},
                    // {type: "calendar", editor: new ElDatePickerColumn(this.jExcelObj), title: "ElDatePickerColumn", width: "120px"},
                    {type: "image",
                     title: "Photo",
                     width: "120px",

                    },
                    {type: "text",
                        title: "ElImages",
                        width: "120px",
                        editor: new ElImageColumn(Vue, this.jExcelObj, {tokenBridge: '/token-bridge/1001@dev/wEZJvHyKTVPuk0LC6WH1srhvRXSWIzr5Ejrhgh1nKn',
                            action:"http://elrdev.glims.cc/file/upload/www",
                            headers: {Authorization: "Bearer wEZJvHyKTVPuk0LC6WH1srhvRXSWIzr5Ejrhgh1nKn"}},{})
                    }, 
                    {type: "text",
                        title: "ElImagesMore",
                        width: "120px",
                        editor: new ElImageColumnMore(Vue, this.jExcelObj, {tokenBridge: '/token-bridge/1001@dev/wEZJvHyKTVPuk0LC6WH1srhvRXSWIzr5Ejrhgh1nKn',
                            action:"http://elrdev.glims.cc/file/upload/www",
                            headers: {Authorization: "Bearer wEZJvHyKTVPuk0LC6WH1srhvRXSWIzr5Ejrhgh1nKn"}},{})
                    },
                    {
                    type: "text",
                    title: "富文本",
                    width: "120px",
                    editor: new ElRichText(Vue, this.jExcelObj, {tokenBridge: '/token-bridge/1001@dev/wEZJvHyKTVPuk0LC6WH1srhvRXSWIzr5Ejrhgh1nKn',
                    action:"http://elrdev.glims.cc/file/upload_content/www",
                    headers: {Authorization: "Bearer wEZJvHyKTVPuk0LC6WH1srhvRXSWIzr5Ejrhgh1nKn"}},{})
                },
                    {type: "myheadurl",
                        title:'头像上传',
                        width: "100px",
                        editor: new ElAvatarUrlColumn(Vue, this.jExcelObj,{tokenBridge: '/token-bridge/1001@dev/wEZJvHyKTVPuk0LC6WH1srhvRXSWIzr5Ejrhgh1nKn',
                            action:"/file/upload/ent",
                            headers: {Authorization: "Bearer wEZJvHyKTVPuk0LC6WH1srhvRXSWIzr5Ejrhgh1nKn"}},{}),
                    },
                    {type: "checkbox", title: "Stock", width: "80px"},
                    {type: "1", title: "Stock", width: "80px"},
                    {
                        type: "numeric",
                        title: "Price",
                        width: "120px",
                        mask: "$ #.##,00",
                        decimal: ","
                    },
                    {
                        type: "mytext2",     // 支持快捷键
                        selectedCell: true,

                        editor: new ElCheckBoxColumn(Vue, this.jExcelObj,
                            {placeholder: '选择或者输入一个', multiple: true, allowCreate: true,
                                filterable: true, defaultFirstOption: true},
                            // {url: 'http://elrdev.glims.cc/api/restful/query/system/user/all?in_filter=model.system.user.User.id__user_ids&user_ids.module=model.system.user_position.UserPositi' +
                            //         'on.&user_ids.in_filter=model.system.user_position.UserPosition.position_id__positions&user_ids.positions.module=model.system.position.Position.id&user_ids.positions.equal_filter' +
                            //         '=model.system.position.Position.code__sale&equal_filter=model.system.user.User.state_valid__valid&option=label__name,value__id&order_by=model.system.user.User.id&per_page=300',
                            //         headers:{Authorization: 'Bearer tLjd8jVnGQwgNoYINMygp5yD3JHYGU0EgldofuDM7I'}}
                            {url: '/api/restful/query/system/position/options?code=state_valid&option=label__name,value__code',
                        headers:{Authorization: "Bearer wEZJvHyKTVPuk0LC6WH1srhvRXSWIzr5Ejrhgh1nKn"}}
                        ),

                        // editor: new ElCheckBoxColumn(Vue, this.jExcelObj,
                        // {url: '/api/restful/query/system/position/options?code=state_valid&option=label__name,value__code',
                        // headers:{Authorization: "Bearer wEZJvHyKTVPuk0LC6WH1srhvRXSWIzr5Ejrhgh1nKn"}}
                        //  ),
                        title: "岗位",
                        width: "450px",
                    },

                    {type: "color", width: "100px", render: "square"},
                    {type: "mytext",
                        title: "Link",
                        width: "120px",
                        editor: new ElLinkColumn(Vue, this.jExcelObj, {},{textFilter: this.linkText,clicked: this.clicked})
                    }
                ]
            };
        }
    },
    methods: {
        insertRowc() {
            // console.log(this);
// this.spreadsheet.insertRow();
        },
        changed: function(instance, cell, x, y, value) {
            var cellName = jexcel.getColumnNameFromId([x,y]);

            console.log('cell ' + cellName + ' value is changed to : ' + value);

        },
        onselection(instance, borderLeft, borderTop, borderRight, borderBottom, origin) {
            // let el = document.getElementById("spreadsheet2")
            // if (! this.jexcel2){
            //     this.jexcel2 = jexcel(this.$refs["spreadsheet2"], this.jExcelOptions) ;
            // } else {
            //     this.jexcel2.refresh()
            //     // console.log('jexcel2 updated', this.jexcel2.options.data)
            // }
            this.selectedCell = this.jExcelObj.records[borderLeft][borderTop]
            console.log(this.selectedCell)
        },
        onblur() {
            // console.log('onblur')
        },
        linkText(value) {
            if (value && value !== '') return '有值de'
            return '空值de'
        },
        clicked(cell) {
            let value = this.jExcelObj.getValue(cell, false);
            console.log('helloworld, clicked', whatIsIt(value), cell)
            if (value && value !== '') this.jExcelObj.setValue(cell, null)
            if (!value || !value === '') this.jExcelObj.setValue(cell, '123456')
        },
        setColReadOnly(colTitle) {
            let col = -1
            for (let i = 0; i < this.jExcelObj.options.columns.length; i++){
                let column = this.jExcelObj.options.columns[i]
                if (column.title === colTitle) {
                    col = i
                    break
                }
            }
            if (col === -1) {
                console.log('错误，没有找到列', colTitle)
                return
            }
            for (let row = 0; row < this.myCars.length; row++) {
                let cell = this.jExcelObj.getCell([col, row])
                cell.classList.add('readonly')
                console.log('设置只读', cell)
                let uid = cell.getAttribute('_uid')
                if (uid) {
                    let comp = this.getVueComponentByDom(cell, uid)
                    if(comp && comp.hasOwnProperty('setReadonly')) {
                        comp.setReadonly(true)
                    }
                }
            }
        },
        getVueComponentByDom(dom, uid) {
            let vueComponent = dom["__vue__"]
            if(vueComponent && String(vueComponent._uid) === String(uid)) return vueComponent

            for (let i = 0; i <= dom.children.length - 1; i ++){
                let cd = dom.children[i]
                let vc = this.getVueComponentByDom(cd, uid)
                if (vc) return vc
            }
            return null
        },
        sKeyDown(e){
            if (e.isTrusted){
                console.log('用户键盘事件', e)
                
                if (this.selectedCell){
                    let elInput = getChildByNodeName(this.selectedCell, 'input')
                    if (elInput){
                        // 系统键盘改为自定义键盘
                        e.preventDefault()
                        let evtObj = new KeyboardEvent(e.type,
                            {bubbles:true, key: e.key, code: e.code, keyCode: e.keyCode,
                                cancelable: true, which: e.which})
                        elInput.dispatchEvent(evtObj)
                    }
                }
            } else {
                console.log('模拟键盘事件', e)
            }
        }
},
    mounted: function () {
//console.log(this.jExcelOptions);
//console.log(this.$refs["spreadsheet"]);
        Object.assign(this.jExcelObj, jexcel(this.$refs["spreadsheet"], this.jExcelOptions)) ;
        document.addEventListener("keydown", this.sKeyDown);
        // 测试只读的列
        let _this = this
        this.$nextTick(() => {
            // _this.setColReadOnly('头像上传')
            // _this.setColReadOnly('ElImages')
            // _this.setColReadOnly('富文本')
        })
        // axios.get('/mock/elselect/options').then(res => {//get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致
        //     this.data = res.data.data;
        //     console.log('/mock/elselect/options', res.data);//在console中看到数据
        // }).catch(res => {
        //     alert('wrong' + res);
        // })

    }
};

const imageExample =
    "data:image/jpeg;base64,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";
