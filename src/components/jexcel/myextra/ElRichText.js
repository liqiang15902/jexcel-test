import {EditorBase} from "@/components/jexcel/myextra/EditorBase";
import MyJExcelRichText from './myJExcelRichText';
import MyJExcelRichTextRead from './myJExcelRichTextRead'
import axios from "axios";
import {getTokenBridgeUrl} from "@/utils/token-bridge";
import $ from 'jquery'

export class ElRichText extends EditorBase{
  constructor(vueEnv, jexcelObj, props={}, extra={}) {
    super(vueEnv, jexcelObj, props, extra)
    this.clearCellBeforeOpenEditor = false
  }

  generateEditElement(val, cell, vueComponentDefinition=null) {
    //   console.log(val)
    let comp = super.generateEditElement(val, cell, MyJExcelRichText)
    comp._data.dialogVisible = true 
    if(val){
      if(val.search('.txt') !== -1){
        val = val.replace('<p>','').replace('</p>','')

$.ajax({url:`${comp._props.tokenBridge}${val}`,type:'get',async: false, success: function(res) {
  // console.log(res)
  console.log(JSON.parse(res))
  let data = JSON.parse(res).value
     

      // if(data.value.indexOf('img')!=-1){ //判断img是否存在
      let result = data.replace(/<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/gi,function(match,capture){
  console.log(capture);
  console.log(match);
  match = match.replace(capture,comp._props.tokenBridge + capture)
  return match;
        });
        // console.log(result);
        comp.value = result
 }})
       
      }else {
        comp.value = val
      }
    }else{
//       console.log(val)
      comp.value = null
    }
// console.log(2222)
      return comp
  }

  generateDisplayElement(value, cell, vueComponentDefinition=null) { 

    console.log(value);
    let comp = super.generateEditElement(value, cell, MyJExcelRichText)  
    console.log(comp._data.headers1);

    let va={}
    va.val=value
    va.comp=comp
    console.log(va);
    return super.generateDisplayElement(va,cell,MyJExcelRichTextRead)

    // console.log(value,cell)
    // let that = this
    // let data = {
    //     "file":value
    //   }
    //   let comp = super.generateEditElement(value, cell, MyJExcelRichText)
    //   console.log(comp._data.headers1);
    // if(value && value.endsWith('.txt')){
    //   axios.post('/file/preview_txt', data, {headers: comp._data.headers1}).then(res =>{
    //       let {data} = res
    //       console.log(data.png_list) 
    //       let imgs = data.png_list
    //  let a =  that._generateDisplayElement(value,cell,imgs,comp)
    // //  console.log(a)
    //  return a
    //     })
    // }else {
    //   console.log('#####################################')
    // }
  }
_generateDisplayElement(value,cell,imgs,comp){
  console.log(111)
  let that = this
      let element = document.createElement('div')
      element.style.height='25px'
      element.style.width='20px'
      for(let i=0; i<imgs.length && i<9; i++){
                    let imgElement = document.createElement('img');    //单元格内添加标签必须使用原生添加节点事件，不然无效
                    // let imgUrl = res.png_list[i]
                    let imgUrl = that._getResizeImgUrl(imgs[i], '20x25')
                    if (comp._data.tokenBridge1) imgUrl = getTokenBridgeUrl(imgUrl, comp._data.tokenBridge1)
                    imgElement.src=imgUrl             
                    element.appendChild(imgElement);
                  }          
                  cell.appendChild(element)
                  // console.log(element)
                  return element
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
