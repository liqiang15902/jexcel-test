import {EditorBase} from "@/components/jexcel/myextra/EditorBase";
import MyJExcelLink from "@/components/jexcel/myextra/myJExcelLink";
import {myJExcelKeyDownControls, myJExcelMouseDownControls} from "@/components/jexcel/myextra/MyJExcelEventControls";


export class ElLinkColumn extends EditorBase {
    constructor(vueEnv, jexcelObj, props={}, extra={}) {
        super(vueEnv, jexcelObj, props, extra);
        // this.clearCellBeforeOpenEditor = false
    }

    generateDisplayElement(value, cell, vueComponentDefinition=null) {
        let comp = super.generateDisplayElement(value, cell, MyJExcelLink)
        if (this.extra.clicked) comp.clicked = this.extra.clicked
        if (this.extra.textFilter) comp.textFilter = this.extra.textFilter
        // cell.classList.add('readonly')
        // myJExcelMouseDownControls.addActiveComponent(comp)
        // myJExcelKeyDownControls.addActiveComponent(comp, this.notControlledKeys)
        return comp
    }

    generateEditElement(value, cell, vueComponentDefinition=null) {
        // console.log('generateEditElement, 这里应该永远调不到')
        return this.generateDisplayElement(value, cell, vueComponentDefinition)
    }

    openEditor(cell, el, empty, e) {
        // console.log('openEditor, called')
        // do nothing
    }

    // closeEditor(cell, save) {
    //     // do nothing
    //     console.log('closeEditor, called')
    //     let value = this.jexcelObj.getValue(cell, false);
    //     return value
    // }

    // updateCell(cell, value, force) {
    //     // do nothing
    //     // this.elComponent.value = value
    //     return value
    // }
}
