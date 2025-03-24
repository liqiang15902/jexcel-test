<template>
  <div>
    <el-dialog
      class="dialgPre"
      title="图片"
      v-if="detailVisible"
      :visible.sync="detailVisible"
      width="50%"
    >
      <div  v-for="(src,index) in previewImgs" :key="index">    
     <el-image
      style="width: 400px; height: 500px"
      :src="src"
      ></el-image>
    </div>
    </el-dialog>


        <div class="divflex">
        <div  v-for="(item,index) in Imgs" :key="index" style="width: 20px;height: 20px;" @dblclick="detailVisible=readonly" >
        <img   :src="_getResizeImgUrl(item,'20x20')"/>
    </div>
    </div>
    <!-- <div @dblclick="detailVisible = readonly">{{imgUrl}}</div> -->
  </div>
</template>

<script>
import axios from "axios";
import { getTokenBridgeUrl } from "@/utils/token-bridge";
import $ from 'jquery'

export default {
  name: "myJExcelRichTextRead",
  data() {
    return {
      value: null,
      cell: null,

      readonly: false, // 是否是只读模式
      detailVisible: false,

        Imgs:[],
      previewImgs: [],
    };
  },

  computed:{
    imgUrl () {
      if(this.value && this.value.val.endsWith(".txt")){
        let a=this.img(this.value.val)
        console.log(a);
        return a
      }
      return null
    }
  },

  created(){
    console.log(this.value,'富文本');
  },

  mounted(){
     console.log(this.value,'富文本23');
  },

  watch: {
    value(){
        if(this.value && this.value.val.endsWith(".txt")){
            let that=this
        console.log(this.value,'富文本2');
        let data = {
          file: this.value.val,
        };
          axios
            .post("/file/preview_txt", data, {
              headers: this.value.comp._data.headers1,
            })
            .then((res) => {
              let { data } = res;
              console.log(data);
              data.png_list.forEach(ele=>{
                that.Imgs.push(getTokenBridgeUrl(ele, that.value.comp._data.tokenBridge1))
              })

            });
        }
    },

    detailVisible() {
      if (this.detailVisible) {
        let that = this;
        let data = {
          file: this.value.val,
        };
        console.log(this.value.comp._data.headers1);
        if (this.value.val && this.value.val.endsWith(".txt")) {
          console.log(data, this.value);
          axios
            .post("/file/preview_txt", data, {
              headers: this.value.comp._data.headers1,
            })
            .then((res) => {
              let { data } = res;
              console.log(data);
            //   that.previewImgs = data.png_list;

              data.png_list.forEach(ele=>{
                that.previewImgs.push(getTokenBridgeUrl(ele, that.value.comp._data.tokenBridge1))
              })
              console.log(that.previewImgs);
            });
        }
      }
    },
  },
  methods: {
    setReadonly(bReadonly) {
      // json-excel会识别此方式，并在设置单元格为只读的时候调用。
      console.log("setReadonly called", bReadonly);
      this.readonly = bReadonly;
    },

    img(){
        let data = {
          file: this.value.val,
        };
        console.log(this.value.comp._data.headers1);
       
          console.log(data, this.value);


          axios
            .post("/file/preview_txt", data, {
              headers: this.value.comp._data.headers1,
            })
            .then((res) => {
              let { data } = res;
              console.log(data);
            //   that.previewImgs = data.png_list;

              data.png_list.forEach(ele=>{
                that.previewImgs.push(getTokenBridgeUrl(ele, that.value.comp._data.tokenBridge1))
              })
              console.log(that.previewImgs);
            });
        
        return val
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
  },
  },
};
</script>
<style scoped>
  .divflex{
  display: flex;
  justify-content: space-around;
}
</style>
