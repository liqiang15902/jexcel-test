<template>
<div>
   <el-dialog
    title="预览"
    @close="close"
    :before-close="closedialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="100%">
    <el-button type="primary" @click="previewPic">预览</el-button>
   <tinymacgg isTextNum="true" @input="inputContent" v-model="value" :headers="headers1" :tokenBridge="tokenBridge1"></tinymacgg>
   <!-- <button type="primary" @click="savetoJson">保存</button> -->
  </el-dialog>
  <el-dialog class="dialgPre"
    title="预览"
    :before-close="closedialogPreview"
    :visible.sync="dialogVisiblePreview"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="100%"
    >
<div  v-loading.fullscreen.lock="fullscreenLoading">
    <div class="imgdiv" v-for="(src,index) in previewImgs" :key="index">
    <el-image
      style="width: 50%; height: 100%"
      :src="tokenBridge1 + src"
      ></el-image>
  </div>
   <span class="dialogfooter">
        <el-button type="primary" @click="cancel">关 闭</el-button>
    </span>

      </div>
  </el-dialog>

  </div>

</template>

<script>
import tinymacgg from './components/tinymcegg.vue'
import jexcel from "@/components/jexcel/jexcel";
import axios from 'axios'
import {getTokenBridgeUrl} from "@/utils/token-bridge";
import {myJExcelMouseDownControls} from "@/components/jexcel/myextra/MyJExcelEventControls";
export default {
    components:{
        tinymacgg
    },
     props: {
    action: {
      type: String,
      default: ""
    },
    headers: {
      type: Object,
      default: {}
    },
    tokenBridge:{   // lims后台专用，在网址之间加上tokenBridge，使图片能适应权限控制
      type: String, //
      default: null
    }
     },
    data(){
        return {
            dialogVisible:false,
            cell:null,
            value:null,
            parentJexcelInstance: null,//自定义的表格组件需要的参数
            isTileMode: false,  //自定义的表格组件需要的参数，是否平铺模式
          tileModeParent: null, //自定义的表格组件需要的参数，平铺模式时指向父组件
            headers1:this.headers,
            tokenBridge1:this.tokenBridge,
            pCom:null,
            dialogVisiblePreview:false,
            previewImgs:[
            //  '/file/downloads/ent/dev/admin/202207/121bc334-f92f-11ec-8052-00163e0e4e24.jpg',
            //  '/file/downloads/ent/dev/admin/202207/121bc334-f92f-11ec-8052-00163e0e4e24.jpg'
            ],
            fullscreenLoading:false


        }
    },
    methods: {
      cancel(){
        this.dialogVisiblePreview = false
      },
      closedialogPreview(){
        this.dialogVisiblePreview = false
      },
      previewPic(){
        console.log(this.headers)
        if(this.pCom == '' || this.pCom ==null){
                this.value = ''
                 this.$message.error('内容为空')
                return
            }
        this.dialogVisiblePreview = true
         let that = this
            let result = this.pCom.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match,capture) {
  console.log(capture);
   console.log(match);
  match = match.replace(that.tokenBridge,'')
  return match;
        });
        // 抽离成可配置的匹配列表
const matchList  = {
  '&lt;': '<',
  '&gt;': '>',
  '&amp;': '&',
  '&#34;': '"',
  '&quot;': '"',
  '&#39;': "'",
  '&Omega;':'Ω'
}
const HtmlFilter = (text) => {
  let regStr = '(' + Object.keys(matchList).toString() + ')'
  // ↑ ------------【*提取匹配列表key值*】.【组数转字符串】
  regStr = regStr.replace(/,/g, ')|(')
  // ↑ 通过匹配将其更新为正则的字符串类型
  const regExp = new RegExp(regStr, 'g')
  // ↑ ------- 字符串 转 正则 方法
  return text.replace(regExp, match => matchList[match])
  // ↑ ------ 替换方法 (正则, 当前key => 返回当前被匹配的key值)
}

result = HtmlFilter(result)
            // result = result.replace('&Omega;','Ω')
          console.log(result)
            let json = {
      value:result
    }
    json = {'type':'txt','content':json}
    this.fullscreenLoading = true
     axios.post(this.action, json, {headers: this.headers}).then(res =>{
      let {data} = res
      // console.log(data)
    //  this.value = data.url
        let dataTxt = {
        "file":data.url
      }
      axios.post('/file/preview_txt', dataTxt, {headers: this.headers}).then(res =>{
            // console.log(res)
            this.fullscreenLoading = false
          let {data} = res
          console.log(data.png_list)
          this.previewImgs = data.png_list
        })

    }).catch(err =>{

    })
      },
        savetoJson(){
        },
        inputContent(pComment){
            let that = this
            this.pCom = pComment
            console.log( this.pCom)
            that.$nextTick(function(){
                 that.pCom = pComment
                  console.log( this.pCom)
            })
            // let that = this

        //    if(pComment.indexOf(this.tokenBridge) !== -1){
            // pComment =  pComment.replace(this.tokenBridge,'')
//             let result = pComment.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match,capture) {
//   console.log(capture);
//   capture = capture.replace(that.tokenBridge,'')
//   return '<img src=' + capture+' />';
//         });
//         console.log(result)

//            if(result == '' || result ==null){
//                 this.value = ''
//                 return
//             }
//             let json = {
//       value:result
//     }
//     json = {'type':'json','content':json}
//      axios.post(this.action, json, {headers: this.headers}).then(res =>{
//       let {data} = res
//       console.log(data)

//      this.value = data.url
//    console.log(222)
//     })

        //    }
        },
      close(){
        // 支持平铺模式
        if (this.isTileMode && this.tileModeParent) {
          this.tileModeParent.closeEdit(this.cell, false)
        }
      },
      // 图片上传弹窗按钮   不管弹窗是点击确定、取消、关闭按钮都会重新渲染单元格内的图片，并关闭弹窗
    closedialog(e){
        console.log('关闭事件')
        //  console.log(this.pCom)
          if(this.pCom == '' || this.pCom ==null){
                this.value = ''
                 this.dialogVisible = false
                return
            }
            let that = this
            let result = this.pCom.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match,capture) {
  console.log(capture);
   console.log(match);
  match = match.replace(that.tokenBridge,'')
  return match;
        });
        // 抽离成可配置的匹配列表
const matchList  = {
  '&lt;': '<',
  '&gt;': '>',
  '&amp;': '&',
  '&#34;': '"',
  '&quot;': '"',
  '&#39;': "'",
  '&Omega;':'Ω'
}
const HtmlFilter = (text) => {
  let regStr = '(' + Object.keys(matchList).toString() + ')'
  // ↑ ------------【*提取匹配列表key值*】.【组数转字符串】
  regStr = regStr.replace(/,/g, ')|(')
  // ↑ 通过匹配将其更新为正则的字符串类型
  const regExp = new RegExp(regStr, 'g')
  // ↑ ------- 字符串 转 正则 方法
  return text.replace(regExp, match => matchList[match])
  // ↑ ------ 替换方法 (正则, 当前key => 返回当前被匹配的key值)
}

result = HtmlFilter(result)
            // result = result.replace('&Omega;','Ω')
          console.log(result)
            let json = {
      value:result
    }
    json = {'type':'txt','content':json}
     axios.post(this.action, json, {headers: this.headers}).then(res =>{
      let {data} = res
      // console.log(data)

     this.value = data.url
   console.log(222)
   this.dialogVisible = false
       if (this.parentJexcelInstance && this.cell) {
         if (this.isTileMode){
           this.parentJexcelInstance.updateCell(this.cell.getAttribute('data-x'), this.cell.getAttribute('data-y'), this.value, true)
         } else {
           this.parentJexcelInstance.closeEditor(this.cell, true)
         }
       }
    }).catch(err =>{
      this.dialogVisible = false
    })
    //    this.dialogVisible=false  //确定按钮关闭图片弹窗
    //    setTimeout(()=>{

    //    },1500)

    },
      getDisplayUrl(url) {
      if (this.tokenBridge){
        return getTokenBridgeUrl(url, this.tokenBridge)
      }
      return url
    }

},
  mounted() {
      // 对mceu_xxx格式的element，接管鼠标事件
    myJExcelMouseDownControls.addActiveElementId(/^mceu_[0-9]+$/)
  },
     destroyed () {
       // 取消对mceu_xxx格式的element，接管鼠标事件
       myJExcelMouseDownControls.removeActiveElementId(/^mceu_[0-9]+$/)
    console.log('159')

  },
}
</script>

<style  scoped>
:deep(.el-dialog__body > .dialgPre) {
  /* display: flex;
  flex-direction: column;
    justify-content: space-around; */


}

.imgdiv {
  display: flex;
  align-items: center;
  justify-content: center;

  margin:30px 0;
  box-shadow: 1px 1px 1px 1px grey;
  /* width:400px;
  height: 500px; */
}
.dialogfooter {
    position: fixed;
        right:50px;
        bottom: 100px;
}
</style>
