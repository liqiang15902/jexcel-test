<template>
  <div>
  <el-dialog
    id="dialog-upload"
    title="图片"
    :before-close="closedialog"
    @close="close"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="50%"
    >
    <!-- 拖拽排序 -->
    <draggable v-model="value" @update="datadragEnd" class="draggable" style="white-space: pre-wrap;" >
      <!-- <div v-for="(item) in value" :key="item" class="draggable-img" >
        <img :src="item" alt=""   width="100px" height="100px">
        <i title="放大" class="enlarge" @click="enlarge($event)"></i>
      </div> -->
      <div  v-for="(item,index) in value" :key="index" class="demo-image__preview draggable-img" >
        <el-image
          style="width: 100px; height: 100px;"
          :src="getDisplayUrl(item.url)"
          :preview-src-list="value.map(o => {return getDisplayUrl(o.url)})"
          @click="picturePreview"
          >
        </el-image>
        <!-- 删除图片按钮 -->
        <i title="删除" class="deleteimg" @click="deleteimg(item.url)"></i>
      </div>
    </draggable>
    <el-upload
              class="upload"
              :disabled="disabledUpload"
              :action="action"
              :headers="headers"
              accept=".jpg,.png,.jpeg,.gif,.bmp"
              list-type="picture-card"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
              :before-upload="beforeUpload"
              :limit="9"
              multiple
              :drag="true"
            >

            <i class="el-icon-upload" v-if="!disabledUpload"></i>
              <i class="el-icon-circle-close" v-else></i>
            <span class="text-upload" v-if="!disabledUpload">点击上传图片或拖拽上传图片</span>
            <span class="text-upload" v-else>图片数量已经达到最大限制，禁止上传</span>

    </el-upload>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="cleanlist">删 除</el-button> -->
      <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
      <!-- <el-button @click="closedialog">取 消</el-button> -->
      <el-button type="primary" @click="closedialog">确 定</el-button>
    </span>
  </el-dialog>

  </div>
</template>
<script>
import Vue from 'vue'
import jexcel from "@/components/jexcel/jexcel";
import draggable from 'vuedraggable'

import {getTokenBridgeUrl, removeUrlTokenBridge} from "@/utils/token-bridge";
// import { delayJexcelMouseEvent} from "@/components/jexcel/myextra/DelayJexcelEvent";
export default {
  name:"myElImage",
  //注册draggable拖拽排序组件
  components: {
    draggable,
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
    },
  },
  data() {
    return {
      value: null,        // 自定义的表格组件需要的参数
      cell: null,         // 自定义的表格组件需要的参数
      parentJexcelInstance: null,//自定义的表格组件需要的参数
      isTileMode: false,  //自定义的表格组件需要的参数，是否平铺模式
      tileModeParent: null, //自定义的表格组件需要的参数，平铺模式时指向父组件
      dialogVisible: false,
      disabledUpload:false,    //是否禁止上传图片文件
      listCount:0,           //当前单元格已经上传的图片数量

    };
  },
  watch:{
    // 监听单元格图片数量,限制上传数量
    "value":function(){
      this.listCount=this.value.length
        if(this.value.length>=9){
          this.disabledUpload=true
        }else {
          this.disabledUpload=false
        }
    }
  },
  methods:{
    // 阻止jexcel当前单元格的关闭事件
    picturePreview(){
   // console.log('点击了');
    },
    // 删除图片方法
    deleteimg(img){   //e.target   当前点击元素
      for(let i=0;i<this.value.length;i++){
        if(img==this.value[i].url){
          this.value.splice(i,1)
          this.listCount--
          i--
        }
      }
    },
    close(){
      // 支持平铺模式
      if (this.isTileMode && this.tileModeParent) {
        this.tileModeParent.closeEdit(this.cell, false)
      }
    },
    // 图片上传弹窗按钮   不管弹窗是点击确定、取消、关闭按钮都会重新渲染单元格内的图片，并关闭弹窗
    closedialog(e){
      this.dialogVisible=false  //确定按钮关闭图片弹窗

      if (this.parentJexcelInstance && this.cell) {
        if (this.isTileMode){
          this.parentJexcelInstance.updateCell(this.cell.getAttribute('data-x'), this.cell.getAttribute('data-y'), this.value, true)
        } else {
          this.parentJexcelInstance.closeEditor(this.cell, true)
        }
      }
    },
    // 拖拽图片排序
    datadragEnd (evt) {
      evt.preventDefault();
    },
    handleUploadSuccess(res, file,fileList){
      if (res.url.startsWith('/') && this.action.startsWith('http')) {
        let urls = this.action.split('/')
        res.url = urls[0] + '//' + urls[2] + res.url
      }
      this.value.push(res)
    },
    beforeUpload(file,fileList){
      if(this.listCount>=9){
        this.$notify.warning('图片数量已经达到最大限制')
        return false
      }
      this.listCount++
    },
    getDisplayUrl(url) {
      if (this.tokenBridge){
      
        return getTokenBridgeUrl(url, this.tokenBridge)
      }
      return url
    },

    setReadonly(bReadonly) {  // json-excel会识别此方式，并在设置单元格为只读的时候调用。
    console.log(bReadonly);
      // this.readonly = bReadonly
    },
  }
}
</script>
<style scoped>
.text-upload {
  position: absolute;
  left: 50%;
  top: 30px;
  margin-left: -87px;    /* 高度的一半 */
  font-size: 12px;
  user-select: none;
}
/deep/.el-dialog__body {
  position: relative;
}

/deep/.el-upload {
  display: inline-table;
    position: absolute;
    left: 50%;
    margin-left: -180px;
    top: 10px;
}
.draggable {
  margin-top:180px;

}
.draggable-img {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
}
.draggable-img:hover .deleteimg{
  display: block;
   cursor:pointer;
}
.deleteimg {
   cursor:pointer;
  display: none;
  position: absolute;
  top: 20%;
  left: 32%;
  margin-left: -34px;
  margin-top: -17px;
  width: 26px;
  height: 26px;
  background-image: url('../../../assets/img-icon/delete.png');
  background-size:cover ;
}
/* /deep/.highlight {
  white-space: pre-wrap!important;
} */
.jexcel > tbody > tr > td  {
  white-space: pre-wrap!important;
}





</style>
