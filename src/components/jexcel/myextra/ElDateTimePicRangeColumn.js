import moment from 'moment'
import {EditorBase} from "@/components/jexcel/myextra/EditorBase";
import MyJExcelDateTimePicRange from './myJExcelDateTimePicRange';
import {getChildByNodeName} from "@/utils/element";

export class ElDateTimePicRangeColumn extends EditorBase{
    constructor(vueEnv, jexcelObj, props={}, extra={}) {
        super(vueEnv, jexcelObj, props, extra)
        // 设置日期格式的默认值
        this.extra = {valueFormat: 'YYYY-MM-DD HH:mm:ss', ...this.extra}
    }

    generateEditElement(value, cell, vueComponentDefinition=null) {
        console.log(value,typeof value,'valueEdit')
        let temp = []
        if(value){
        value = value.replace(/\[|]/g,'').split(',')
        temp.push(value[0])
        temp.push(value[1])
        console.log(temp,'temp')
        }
        
        
        
        let comp = super.generateEditElement(temp, cell, MyJExcelDateTimePicRange)
        getChildByNodeName(comp.$el, 'input').focus()
        return comp
    }

    generateDisplayElement(value, cell, vueComponentDefinition=null) {
        console.log(value,typeof value,'valuevalue')
      
        // console.log(value,'valuie')
        // console.log(value[0])
        // console.log(value[1])
        let element = document.createElement('div')
        // moment的'YYYY-MM-DD HH:mm:ss'对应element的yyyy-MM-dd HH:mm:ss
        if (value) {
            value = value.replace(/\[|]/g,'').split(',')
            console.log(value[0])
            console.log(value[1])
            element.innerHTML = `${moment(value[0], 'YYYY-MM-DD HH:mm:ss').format(this.extra.valueFormat)}至${moment(value[1], 'YYYY-MM-DD HH:mm:ss').format(this.extra.valueFormat)}`
        } else {
            element.innerHTML = ""
        }
        cell.appendChild(element)
        return element
    }

    openEditor(cell, el, empty, e, controlMouseAndKey=true)  {
        super.openEditor(cell, el, empty, e, controlMouseAndKey)
        // e.preventDefault()
    }
}
