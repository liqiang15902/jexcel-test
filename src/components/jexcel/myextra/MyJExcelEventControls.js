import jexcel from "@/components/jexcel/jexcel";
import {isStringOrRegExpEqual, isStringMatchedByStringOrRegExp} from '@/utils/is-reg-exp'


class MyJExcelMouseDownControls {
    /**
     * 在自定义组件激活的状态下，屏蔽对jexcel事件的响应，防止因为jexcel的鼠标事件导致自定义组件不能正常使用
     */
    constructor() {
        this.activeComponents = []      // 当前激活的自定义组件清单
        this.activeElementIds = []      // 当前激活的document的ID
        this.enabled = false            // 是否禁用当前的鼠标事件至JExcel
    }

    static instance() {
        if (!MyJExcelMouseDownControls.uniqueInstance) {
            MyJExcelMouseDownControls.uniqueInstance = new MyJExcelMouseDownControls();
        }
        return MyJExcelMouseDownControls.uniqueInstance;
    }

    addActiveComponent(component) {
        if (!component) return
        // 重复添加
        if (this.activeComponents.map(o => {return o._uid}).includes(component._uid)) return
        // 增加一个uid作为控制，主要是因为component的内容可能产生变化，导致无法作为remove的依据
        this.activeComponents.push(component)
        // console.log('addActiveComponent(component)', myJExcelMouseDownControls.activeComponents)
        this._enable()
    }

    addActiveElementId(id) {
        if (!id) return
        // 防止重复添加
        for(let i = 0; i <= this.activeElementIds.length - 1; i++) {
            if (isStringOrRegExpEqual(this.activeElementIds[i], id)) return
        }
        this.activeElementIds.push(id)
        this._enable()
    }

    removeActiveComponent(component) {
        for (let i = 0; i <= this.activeComponents.length - 1; i++){
            if (this.activeComponents[i]._uid === component._uid) {
                this.activeComponents.splice(i, 1)
                break
            }
        }
        if (this.activeComponents.length === 0 && this.activeElementIds.length === 0){
            this._disable()
        }
    }

    removeActiveElementId(id) {
        for (let i = 0; i <= this.activeElementIds.length - 1; i++){
            if (isStringOrRegExpEqual(this.activeElementIds[i], id)) {
                this.activeElementIds.splice(i, 1)
                break
            }
        }
        if (this.activeComponents.length === 0 && this.activeElementIds.length === 0){
            this._disable()
        }
    }

    removeAll() {
        this.activeComponents = []
        this.activeElementIds = []
        this._disable()
    }

    _enable() {
        if (!this.enabled) {
            document.removeEventListener("mousedown", jexcel.mouseDownControls);
            document.addEventListener("mousedown", myJExcelMouseDownControls.onMouseDownControls)
            this.enabled = true
        }
    }

    _disable() {
        if (this.enabled) {
            document.addEventListener("mousedown", jexcel.mouseDownControls);
            document.removeEventListener("mousedown", myJExcelMouseDownControls.onMouseDownControls)
            this.enabled = false
        }
    }

    onMouseDownControls(e) {
     // console.log('onMouseDownControls(e)', e, myJExcelMouseDownControls.activeComponents)
        if(myJExcelMouseDownControls._isMouseDownInActiveComponents(e)){
            // 鼠标事件在活动活动的component范围内，不调用jexcel的鼠标事件
            return
        }
        if(myJExcelMouseDownControls._isMouseDownInActiveElementIds(e)){
            // 鼠标事件在活动活动的component范围内，不调用jexcel的鼠标事件
            return
        }
        // 如果鼠标没有点击在当前激活的active范围内，响应jexcel的鼠标事件
        jexcel.mouseDownControls(e)
    }

    _isMouseDownInActiveComponents(e){
        let path = e.composedPath()
        // console.log('_isMouseDownInActiveComponents', path)
        let ret = false

        // 找到第一个vue组件
        let eventComponent = null
        if (path) {
            for (let i = 0; i <= path.length -1; i++) {
                if (path[i].__vue__){
                    eventComponent = path[i].__vue__
                    console.log('_isMouseDownInActiveComponents, find componnent ', i, path)
                    break
                }
            }
        }

        // 所有激活的component的uid
        let activeUids = this._getActiveComponentUids()

        while(!ret && eventComponent) { // 循环查找父级，判断鼠标是否点击在对应的component范围内
            if (activeUids.includes(eventComponent._uid)) ret = true
            eventComponent = eventComponent.$parent
        }

        return ret
    }

    _isMouseDownInActiveElementIds(e){
        let path = e.composedPath()
        // console.log('_isMouseDownInActiveElementIds', path)

        // 找到event的所有关联id
        let eventIds = []
        if (path) {
            for (let i = 0; i <= path.length -1; i++) {
                if (path[i].id) {
                    let curElementId = path[i].id
                    for(let i = 0; i <= this.activeElementIds.length - 1; i++) {
                        if (isStringMatchedByStringOrRegExp(curElementId, this.activeElementIds[i])) return true
                    }
                }
            }
        }

        return false
    }

    _getActiveComponentUids(){
        let uids =this.activeComponents.map(o => {return o._uid})
        // 判断activeComponents中是否包含了时间或者日期选择框，这里可能会由弹框
        this.activeComponents.forEach(c => {
            c.$children.forEach(cc => {
                if (cc.picker && cc.picker._uid) {
                    uids.push(cc.picker._uid)
                }
            })
        })
        return uids
    }
}


class MyJExcelKeyDownControls {
    /**
     * 在自定义组件激活的状态下，屏蔽对jexcel事件的响应，防止因为jexcel的鼠标事件导致自定义组件不能正常使用
     */
    constructor() {
        this.activeComponents = []      // 当前激活的自定义组件清单
        this.activeElementIds = []      // 当前激活的document的ID，暂未启用
        this.notControlledKeys = {}     // 仍然需要向JExcel传递的键盘事件
        this.enabled = false            // 是否禁用当前的鼠标事件至JExcel
    }

    static instance() {
        if (!MyJExcelKeyDownControls.uniqueInstance) {
            MyJExcelKeyDownControls.uniqueInstance = new MyJExcelKeyDownControls();
        }
        return MyJExcelKeyDownControls.uniqueInstance;
    }

    addActiveComponent(component, keysnotControlledKeys=[]) {
        if (!component) return
        // 重复添加
        if (this.activeComponents.map(o => {return o._uid}).includes(component._uid)) return
        // 增加一个uid作为控制，主要是因为component的内容可能产生变化，导致无法作为remove的依据
        this.activeComponents.push(component)
        this.notControlledKeys[String(component._uid)] = keysnotControlledKeys
        this._enable()
    }

    removeActiveComponent(component) {
        for (let i = 0; i <= this.activeComponents.length - 1; i++){
            if (this.activeComponents[i]._uid == component._uid) {
                this.activeComponents.splice(i, 1)
                delete this.notControlledKeys[String(component._uid)]
                break
            }
        }
        if (this.activeComponents.length === 0){
            this._disable()
        }
    }

    removeAll(){
        this.activeComponents = []
        this.notControlledKeys = {}
        this._disable()
    }

    _enable() {
        if (!this.enabled) {
            document.removeEventListener("keydown", jexcel.keyDownControls);
            document.addEventListener("keydown", myJExcelKeyDownControls.onKeyDownControls)
            this.enabled = true
        }
    }

    _disable() {
        if (this.enabled) {
            document.addEventListener("keydown", jexcel.keyDownControls);
            document.removeEventListener("keydown", myJExcelKeyDownControls.onKeyDownControls)
            this.enabled = false
        }
    }

    onKeyDownControls(e) {
        if(!myJExcelKeyDownControls._isKeyControlled(e)){
            // 未被控制，调用jexcel处理
            jexcel.keyDownControls(e)
        }
        // console.log('onKeyDownControls(e)', myJExcelKeyDownControls._isKeyControlled(e), e)
        // // 完全禁止事件进一步传导，防止全屏时关闭，好像没有用
        // e.keyCode = 0
        // e.cancelBubble = true
        // return false
    }

    _isKeyControlled(e){
        let ret = true

        // 找到第一个vue组件
        let eventComponent = null
        let path = e.composedPath()
        if (path) {
            for (let i = 0; i <= path.length -1; i++) {
                if (path[i].__vue__){
                    eventComponent = path[i].__vue__
                    break
                }
            }
        }

        // 所有激活的component的uid
        let activeUids = this.activeComponents.map(o => {return o._uid})
        let eventUid = 0

        while(!eventUid && eventComponent) { // 循环查找父级，判断鼠标是否点击在对应的component范围内
            if (activeUids.includes(eventComponent._uid)) eventUid = eventComponent._uid
            eventComponent = eventComponent.$parent
        }

        if (eventUid) { // 找到事件所在的组件，进一步判断key是否在排除范围外
            let notControlledKeys = this.notControlledKeys[String(eventUid)]
            // 触发事件的key不在控制范围内
            if (notControlledKeys.includes(e.key) || notControlledKeys.includes(e.keyCode)) {
                ret = false
            } else {
                ret = true
            }
        } else {
            ret = false     // 触发事件的组件不在指定的vue组件上
        }

        return ret
    }
}


export const myJExcelMouseDownControls = MyJExcelMouseDownControls.instance();
export const myJExcelKeyDownControls = MyJExcelKeyDownControls.instance();

