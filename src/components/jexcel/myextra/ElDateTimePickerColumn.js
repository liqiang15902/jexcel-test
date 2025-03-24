import moment from 'moment'
import {EditorBase} from "@/components/jexcel/myextra/EditorBase";
import MyJExcelDateTimePicker from './myJExcelDateTimePicker';
import {getChildByNodeName} from "@/utils/element";

export class ElDateTimePickerColumn extends EditorBase{
    constructor(vueEnv, jexcelObj, props={}, extra={}) {
        super(vueEnv, jexcelObj, props, extra)
        // 设置日期格式的默认值
        this.extra = {valueFormat: 'YYYY-MM-DD HH:mm:ss', ...this.extra}
    }

    generateEditElement(value, cell, vueComponentDefinition=null) {
        let comp = super.generateEditElement(value, cell, MyJExcelDateTimePicker)
        getChildByNodeName(comp.$el, 'input').focus()
        return comp
    }

    generateDisplayElement(value, cell, vueComponentDefinition=null) {
        let element = document.createElement('div')
        // moment的'YYYY-MM-DD HH:mm:ss'对应element的yyyy-MM-dd HH:mm:ss
        if (value) {
            element.innerHTML = moment(value, 'YYYY-MM-DD HH:mm:ss').format(this.extra.valueFormat)
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
