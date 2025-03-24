import {EditorBase} from "@/components/jexcel/myextra/EditorBase";
import myJExcelCheckBox from './myJExcelCheckBox';
import {getChildByNodeName} from "@/utils/element";
import http from "@/components/http";

export class ElCheckBoxColumn extends EditorBase{

    constructor(vueEnv, jexcelObj, props={}, extra={}) {
        super(vueEnv, jexcelObj, props, extra);
        if ('multiple' in this.props && this.props.multiple === true) {
            // console.log(this.props,this.extra)
            // 可多选的时候，Enter也要被控制
            let pos = this.notControlledKeys.indexOf('Enter')
            if (pos >= 0) {
                this.notControlledKeys.splice(pos, 1)
            }
        }
    }

    generateEditElement(value, cell, vueComponentDefinition=null) {
        // console.log('generalEditor', value)
        let comp = super.generateEditElement(value, cell, myJExcelCheckBox)
        // console.log(value,cell);
        if ('multiple' in this.props && this.props.multiple === true){    //此判断用于设置this.elComponent的value值
            if (!value || value == '') {
                comp.value = []
            } else {

                    comp.value = JSON.parse(value)

            }
        } else {
            comp.value = value
        }
        getChildByNodeName(comp.$el, 'input').focus()
        return comp
    }

    generateDisplayElement(value, cell, vueComponentDefinition=null) {
        if(!this.props.options && this.extra.url) {
            let _this = this
            // console.log(this.extra.url, this.extra.headers) 
            http.get(this.extra.url, this.extra.headers).then(data => {
                // console.log('get options from api', this.extra.url, data)
                _this.props.options = data
                _this._generateDisplayElement(value, cell)
                // console.log('createCell', cell)
            })
        } else return this._generateDisplayElement(value, cell)
    }

    _generateDisplayElement(value, cell) {
        let strValue = value ? String(value) : ''        // 都是用string进行比较
        let element = document.createElement('div')
        let innerHTML = ''
        let allOptionValues = []
        if (this.props.options){
            for (let i in this.props.options){
                allOptionValues.push(String(this.props.options[i].value))
            }
        }
        if ('multiple' in this.props && this.props.multiple) {
            let values = strValue !== '' && strValue[0] =='[' ? JSON.parse(strValue) : []
            for (let i in values) {
                let index = allOptionValues.indexOf(values[i])
                if (index == -1) {
                    innerHTML += values[i]
                } else {
                    innerHTML += this.props.options[index].label
                }
                if ( i < values.length - 1) {
                    innerHTML += ', '
                }
            }
        } else {
            let index = allOptionValues.indexOf(strValue)
            if (index == -1) {
                innerHTML = strValue
                // innerHTML = ''    // 单选无效
            } else {
                innerHTML = this.props.options[index].label
            }
        }
        element.innerHTML =  innerHTML
        cell.appendChild(element)
        return element
    }

    // constructor(vueEnv, jexcelObj, request) {
    //     super(vueEnv, jexcelObj);
    //     this.url=request.url
    //     this.headers=request.headers
    //     this.options=null
    // }

    // generateEditElement(value, cell, vueComponentDefinition=null) {
    //     // console.log('generalEditor', value)
    //     let comp = super.generateEditElement(value, cell, myJExcelCheckBox)
    //     if(this.options.length){
    //         comp.options=this.options
    //     }
    //     // console.log(value,cell);
    //     // if ('multiple' in this.props && this.props.multiple === true){    //此判断用于设置this.elComponent的value值
    //     //     if (!value || value == '') {
    //     //         comp.value = []
    //     //     } else {
    //     //         comp.value = JSON.parse(value)
    //     //     }
    //     // } else {
    //     //     comp.value = value
    //     // }
    //     // getChildByNodeName(comp.$el, 'input').focus()
    //     comp.value = value
    //     console.log(comp,comp.value)
    //     return comp
    // }

    // generateDisplayElement(value, cell, vueComponentDefinition=null) {
    //     let _this=this
    //     // console.log('ewqe',this.url, this.headers);
    //     http.get(this.url, this.headers).then(data => {
    //             // console.log('get options from api', data)
    //             this.options = data
    //             _this._generateDisplayElement(value, cell)

    //             // console.log('createCell', cell,value,data,this.options)
    //         })

    // }

    // _generateDisplayElement(value, cell) {
    //     console.log(value);
    //     // console.log(typeof(value));

        
    //     if(value && value[0]=='['){
    //         console.log(JSON.parse(value));
    //         let values=JSON.parse(value)
    //         let element = document.createElement('div')
    //         let innerHTML = ''
    //         console.log(this.options);
    //          for(let i=0;i<this.options.length;i++){
    //             for(let j=0;j<values.length;j++){
    //                 if(this.options[i].value==values[j]){
    //                     console.log(this.options[i],value[j]);
    //                     innerHTML == '' ? innerHTML=innerHTML+this.options[i].label+',':innerHTML=innerHTML+','+this.options[i].label
    //                 }
    //                 // console.log(this.options[i],values[j]);
    //             }
    //          }
    //     element.innerHTML =  innerHTML
    //     console.log(element);
    //     cell.appendChild(element)
    //     return element

    //     }


       
    // }
}
