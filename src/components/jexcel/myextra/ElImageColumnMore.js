import {EditorBase} from "@/components/jexcel/myextra/EditorBase";
import MyElImageMore from './myElImageMore';
import MyElImageReadMore from './myElImageReadMore'
import {whatIsIt} from "@/utils/what-is-it";

export class ElImageColumnMore extends EditorBase{
  constructor(vueEnv, jexcelObj, props={}, extra={}) {
    super(vueEnv, jexcelObj, props, extra)
    this.clearCellBeforeOpenEditor = false
  }

  generateEditElement(value, cell, vueComponentDefinition=null) {
      console.log(value)
    // console.log('generateEditElement', whatIsIt(value), value)
    let comp = super.generateEditElement(value, cell, MyElImageMore)
    if (value && whatIsIt(value) === 'Array') comp.value = value
    if (value && whatIsIt(value) === 'string' && value !== '') {
      comp.value = JSON.parse(value)
    } else {
      comp.value = []
    }
    comp._data.dialogVisible=true    //双击时弹出图片文件上传组件
    // console.log(comp);
    return comp
  }

  generateDisplayElement(value, cell, vueComponentDefinition=null) {
    console.log(value)
    // let arr = []
    // // console.log('generateDisplayElement', whatIsIt(value), value)
    // if (value && whatIsIt(value) === 'Array') arr = value
    // if (value && whatIsIt(value) === 'string' && value !== '') arr = JSON.parse(value)
    // let element = document.createElement('div')
    // element.style.whiteSpace="nowrap";
    // for(let i=0; i<arr.length && i<9; i++){
    //   let imgElement = document.createElement('img');    //单元格内添加标签必须使用原生添加节点事件，不然无效
    //   let imgUrl = this._getResizeImgUrl(arr[i].url, '20x20')
    //   if (this.props.tokenBridge) imgUrl = getTokenBridgeUrl(imgUrl, this.props.tokenBridge)
    //   imgElement.src=imgUrl
    //   element.appendChild(imgElement);
    // }
    // cell.appendChild(element)
    // return element


    if (value && whatIsIt(value) === 'Array') value = value
    if (value && whatIsIt(value) === 'string' && value !== '') value = JSON.parse(value)
    console.log(value);
    return super.generateEditElement(value, cell, MyElImageReadMore)
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
