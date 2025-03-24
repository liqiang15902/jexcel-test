/*!
 一般只需要重写generateEditElement，generateDisplayElement两个方法
 */
import jexcel from "@/components/jexcel/jexcel"
import {destroyVues, getElementValue} from "@/utils/element";
import {myJExcelKeyDownControls, myJExcelMouseDownControls} from "@/components/jexcel/myextra/MyJExcelEventControls";
import {isVueComponent} from "@/utils/is-vue-component";
import {whatIsIt} from "@/utils/what-is-it";  // eslint-disable-line no-unused-vars


/**
 *
 * jspreadsheet的调用顺序
 * 1、初始化参数的时候调用constructor
 * 2、创建表格的时候调用createCell
 * 3、当修改表格为编辑模式的时候调用openEditor
 * 4、当关闭表格的编辑模式的时候调用closeEditor，同时调用updateCell
 * 5、当通过粘贴修改数据的时候，调用updateCell
 */
export class EditorBase {
    /**
     * 初始化方法，可以设置自定义参数，一般不需要重载
     * @vueEnv Vue环境，需要传入当前使用的vue环境才能正常渲染element组件
     * @jexcelObj jexcel对象,传入jexcelObj，方便做更多的高级处理
     * @props 创建vue组件时传入组件的参数
     * @extra 额外需要的额参数清单
     */
    constructor(vueEnv, jexcelObj, props={}, extra={}) {
        this.vueEnv = vueEnv
        this.jexcelObj = jexcelObj
        this.props = props
        this.extra = extra
        this.editorComponent = null     // 便捷模式的vue component
        this.notControlledKeys = ['Escape', 'Enter', 'Tab']    // 需要传递到jexcel的按键事件
        // 在创建Editor组件之前清除cell的内容，部分场景，比如图片选择，因为是弹出框，所以不需要清理cell里的内容
        this.clearCellBeforeOpenEditor = true
    }

    /**
     * 生成编辑模式
     * @param value 单元格的值
     * @param cell 单元格，可以通过这个值得到jexcelObject的一些信息
     * @param vueComponentDefinition vue组件的定义
     */
    generateEditElement(value, cell, vueComponentDefinition=null) {
        if (vueComponentDefinition) {
            let comp = this._createVueComponent(vueComponentDefinition, this.props, cell)
            if (comp.hasOwnProperty('value')) comp.value = value
            if (comp.hasOwnProperty('cell')) comp.cell = cell
            if (comp.hasOwnProperty('parentJexcelInstance')) comp.parentJexcelInstance = this.jexcelObj ? this.jexcelObj : jexcel.current
            if (comp.hasOwnProperty('focus')) comp.focus()
            return comp
        } else {
            // 生成默认的Edit组件
            let element = document.createElement('input')
            element.value = value
            cell.appendChild(element)
            element.focus()
            return element
        }
    }

    /**
     * 生成展示模式，这里如果生成的是vue的component，可能存在内存泄漏
     * @param value 单元格的值
     * @param cell 单元格，可以通过这个值得到jexcelObject的一些信息
     * @param vueComponentDefinition vue组件的定义
     */
    generateDisplayElement(value, cell, vueComponentDefinition=null) {
        if (vueComponentDefinition) {
            let comp = this._createVueComponent(vueComponentDefinition, this.props, cell)
            if (comp.hasOwnProperty('value')) comp.value = value
            if (comp.hasOwnProperty('cell')) comp.cell = cell
            if (comp.hasOwnProperty('parentJexcelInstance')) comp.parentJexcelInstance = this.jexcelObj ? this.jexcelObj : jexcel.current
            return comp
        } else {
            // 生成默认的Edit组件
            let element = document.createElement('div')
            element.innerHTML = value
            cell.appendChild(element)
            return element
        }
    }

    /**
     * jexcel定义的方法，表格初始化的时候调用
     * 此时this.jexcelObj还没有数据，通过设置column的type为mytext，这样通过innerHTML获取初始值
     * @param cell 单元格对应的html
     * @returns {*} 修改html之后的单元格
     */
    createCell(cell) {
        let value = cell.innerHTML  // text类型，value初始化为innerHTML
        cell.innerHTML = ""
        this.generateDisplayElement(value, cell)
        return cell
    }

    /**
     * jexcel定义的方法，双击等将单元格变为可编辑模式时调用
     * jexcel会自动判断，如果是只读模式将不能调用openEditor
     * @param cell 单元格对应的html
     * @param controlMouseAndKey 是否控制键盘和鼠标，editor模式是的打开弹出框，一般需要设置为false，防止鼠标和键盘事件异常
     */
    openEditor(cell, el, empty, e, controlMouseAndKey=true) {    // eslint-disable-line no-unused-vars
        // console.log(cell);
        let value = this.jexcelObj.getValue(cell, false);
        if (this.clearCellBeforeOpenEditor) {
            destroyVues(cell)
            cell.innerHTML = ''
        } else if (this.editorComponent) {
            console.log(`%c警告，打开编辑模式的时候，设置为不清理cell，但是cell中的elComponent仍将被销毁，可能导致显示异常`, 'color: red')
        }
        if (this.editorComponent) {
            // 这里应该不会被调用到
            this.editorComponent.$destroy()
            this.editorComponent = null
        }
        let comp = this.generateEditElement(value, cell)
        if (isVueComponent(comp)) this.editorComponent = comp
        if (controlMouseAndKey){
            myJExcelMouseDownControls.addActiveComponent(this.editorComponent)
            myJExcelKeyDownControls.addActiveComponent(this.editorComponent, this.notControlledKeys)
        }
    }

    /**
     * jexcel定义的方法，关闭编辑模式时调用。不能自己调用
     * 会同步调用updateCell，针对cell的处理，在updateCell中处理，这里只用于获取value
     * 不能调用jexcel的setValue，会导致jexcel误认为值并没有修改
     * @param cell 单元格对应的html
     * @param save ？这个变量还不知道有啥用
     * @returns {*} 单元格的value，jexcel会根据返回值修改单元格的值
     */
    closeEditor(cell, save) {   // eslint-disable-line no-unused-vars
        if (this.editorComponent){
            let value = this.editorComponent.value
            // JExcel不支持array或者object类型的值
            if (['Array', 'Object'].includes(whatIsIt(value))) value = JSON.stringify(value)
            // 这里destory的是editor的Component，如果点击了esc，不会调用updateCell，只能在closeEdit里面destory。
            this.editorComponent.$destroy()
            this.editorComponent = null
            return value
        }
        return getElementValue(cell)
    }

    /**
     * jexcel定义的方法，用了setValue等方法，单元格值变化的时候调用
     * 手工修改值的时候，可能会先调用closeEditor再调用updateCell。
     * 如果是粘贴等方式修改了值，不调用closeEditor，直接调用updateCell.
     * @param cell 单元格对应的html
     * @param value 将要修改的值
     * @param force
     * @returns {*} 写回到JExcel的值
     */
    updateCell(cell, value, force) {  // eslint-disable-line no-unused-vars
        cell.innerHTML = ''
        if (this.editorComponent) {
            this.editorComponent.$destroy()
            this.editorComponent = null
        }
        let comp = this.generateDisplayElement(value, cell)
        // if (isVueComponent(comp)) this.elComponent = comp
        // console.log('closeEditor', whatIsIt(value), value)
        return value
    }

    // 注册并挂载到相应单元格组件方法
    _createVueComponent(Component, props, parentElment) {
        const comp = new (this.vueEnv.extend(Component))({ propsData: props }).$mount()
        parentElment.appendChild(comp.$el)
        parentElment.setAttribute('_uid', comp._uid)
        comp.remove = () => {
            // console.log('vue component destoried')
            // parentElment.removeChild(comp.$el)
            comp.$destroy()
        }
        // console.log(comp);
        return comp
    }
}
