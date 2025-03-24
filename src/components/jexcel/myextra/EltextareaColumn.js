import {EditorBase} from "@/components/jexcel/myextra/EditorBase";
import MyJExcelTextarea from './myJExcelTextarea';
import {getChildByNodeName} from "@/utils/element";  // eslint-disable-line no-unused-vars

export class EltextareaColumn extends EditorBase{
    generateEditElement(value, cell, vueComponentDefinition=null) {
        // console.log('ElInputColumn.generateEditElement', value)
        let comp = super.generateEditElement(value, cell, MyJExcelTextarea)
        comp.dialogVisible = true
        return comp
    }

    generateDisplayElement(value, cell, vueComponentDefinition=null) {
        var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'}; 
       if(value){
        // value = value.replace(/<p[^>]*>|<\/p>/gi,'')
        // value = value.replace('&lt;','')
        // value = value.replace(/<\/?[^>]*>/g, "");
       value =  value.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
         value = value.replace(/<p[^>]*>|<\/p>/gi,'')
       }
       
        console.log(value,typeof value,'我是富文本')
        let element = document.createElement('div')
        element.innerHTML =  value 
        cell.appendChild(element)
        return element
    }

    // openEditor(cell, el, empty, e, controlMouseAndKey=true)  {
    //     super.openEditor(cell, el, empty, e, controlMouseAndKey)
    //     if (this.editorComponent) this.editorComponent.focus()

    //     if (e && e.type === 'keydown'){
    //         e.preventDefault()  // 阻止第一个键录入，在中英文混录的时候，提供统一的输入体验。
    //         // 仿Excel习惯，如果是keydown进入，则替换
    //         this.editorComponent.value = ''
    //         if (this.editorComponent){
    //             this.editorComponent.$nextTick(() => {
    //                 // 模拟键盘事件
    //             })
    //         }
    //     }
    //     // 还没有搞定，中文输入法的时候第一个字幕不能触发输入法体验不好。
    //     // 思路一（已否定）：找到jexcel哪里阻止了把键盘事件传递给操作系统。经确认，jexcel并未阻止事件，而是input框没有触发输入法
    //     // 思路二（可能也行不通）：重新模拟一下键盘事件。模拟成功，但是input框好像不接受模拟的事件
    //     // 这段代码是按照最新标准写的，使用document创建，然后用init设置值的方法已经过时
    //     // 确定事件能dispatch出去，但是，input框并没有反应
    //     //     let evtObj = new KeyboardEvent("keydown",
    //     //         {bubbles:true, key: e.key, code: e.code, keyCode: e.keyCode,
    //     //             which: e.which})
    //     //     let elInput = getChildByNodeName(this.editorComponent.$el, 'input')
    //     //     console.log(elInput.dispatchEvent(evtObj),e, evtObj)
    // }
}
