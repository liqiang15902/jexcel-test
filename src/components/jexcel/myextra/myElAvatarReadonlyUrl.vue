<template>

<div >

  <el-dialog  width="50%" :visible.sync="detailVisible">
    <img :src="_getResizeImgUrl(value,'400x500')" alt="">
    </el-dialog>

  <!-- <div @dblclick="detailVisible=readonly"> -->
      <img :src="_getResizeImgUrl(imgUrl,'20x20')" @dblclick="detailVisible=readonly"/>
  <!-- </div> -->

</div>
</template>

<script>
import {getTokenBridgeUrl} from "@/utils/token-bridge";
export default {
  name: "myElAvatarReadonlyUrl.vue",
  props:{
      tokenBridge:{   // lims后台专用，在网址之间加上tokenBridge，使图片能适应权限控制
      type: String, //
      default: null
    },
  },
  data() {
    return {
      value: null,        // 自定义的表格组件需要的参数
      cell: null,          //自定义的表格组件需要的参数

      
        readonly: false,          // 是否是只读模式
      detailVisible: false,

    };
  },
  computed:{
    imgUrl () {
      if(this.value){
        let urls = this.value.split('.')
        urls[urls.length - 2] = urls[urls.length - 2] 
        return urls.join('.')
      }
      return null
    }
  },
  methods: {
    setReadonly(bReadonly) {  // json-excel会识别此方式，并在设置单元格为只读的时候调用。
      console.log('setReadonly called',bReadonly)
      this.readonly = bReadonly
    },
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
    if (this.tokenBridge) resUrl = getTokenBridgeUrl(resUrl,this.tokenBridge)


    return resUrl
  }
  }
}
</script>

<style scoped>

</style>
