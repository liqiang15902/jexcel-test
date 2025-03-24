import {EditorBase} from "@/components/jexcel/myextra/EditorBase";
import MyElAvatarUrl from "./myElAvatarUrl"
import {getTokenBridgeUrl} from "@/utils/token-bridge";
import {whatIsIt} from "@/utils/what-is-it";
import myElAvatarReadonlyUrl from "@/components/jexcel/myextra/myElAvatarReadonlyUrl";

export class ElAvatarUrlColumn extends EditorBase{
    constructor(vueEnv, jexcelObj, props={}, extra={}) {
      super(vueEnv, jexcelObj, props, extra)
      this.clearCellBeforeOpenEditor = false
    }

    /** 生成编辑模式
    * @param value 单元格的值
    * @param cell 单元格，可以通过这个值得到jexcelObject的一些信息
    * @param vueComponentDefinition vue组件的定义
    */
    generateEditElement(value, cell, vueComponentDefinition=null) {
        // 在单元格内注册组件
        let comp = super.generateEditElement(value, cell, MyElAvatarUrl)
        comp._data.dialogVisible=true    //双击时弹出图片文件上传组件
        return comp
    }

    /**
     * 生成展示模式，这里如果生成的是vue的component，可能存在内存泄漏
     * @param value 单元格的值   默认返回true或false字符串
     * @param cell 单元格，可以通过这个值得到jexcelObject的一些信息
     * @param vueComponentDefinition vue组件的定义
     */
     generateDisplayElement(value, cell, vueComponentDefinition=null) {
         return super.generateDisplayElement(value, cell, myElAvatarReadonlyUrl)
    }



  /**
   * 生成后台识别的获取缩略图的地址，请调用getThumbnailUrl
   * @param url
   * @param size 数字x数字格式，比如128x128
   * @returns {string}
   */
  _getResizeImgUrl(url, size) {
    if(!url){
      return url
    }
    let urls = url.split('.')

    let resUrl = ''
    for(let i=0; i<urls.length - 1; i++) {
      resUrl += i==0 ? urls[i] : '.'+urls[i]
    }
    resUrl += '_' + size
    resUrl += '.' + urls[urls.length-1]

    return resUrl
  }


}
