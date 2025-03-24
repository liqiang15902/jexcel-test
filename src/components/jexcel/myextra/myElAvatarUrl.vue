<template>
  <div>
    <el-dialog
      title="单图上传"
      :visible.sync="dialogVisible"
      width="20%"
      @close="close"
    >
      <el-upload
        class="avatar-uploader"
        :action="action"
        accept=".jpg,.png,.jpeg,.gif,.bmp"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >     
        <img v-if="value" :src="tokenBridge + value" class="avatar" />
        
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-button type="primary" @click="closedialog">确 定</el-button>
    </el-dialog>
  </div>
</template>
<script>
import jexcel from "@/components/jexcel/jexcel";
export default {
  name: "myElAvatarUrl",
  props: {
    //双击单元格创建实例化对象时传propr参数自动赋值到单元格内的组件中
    action: {
      type: String,
      default: "",
    },
    headers: {
      type: Object,
      default: {},
    },
    tokenBridge: {
      // lims后台专用，在网址之间加上tokenBridge，使图片能适应权限控制
      type: String, //
      default: null,
    },
  },

  data() {
    return {
      value: null, // 自定义的表格组件需要的参数
      cell: null, //自定义的表格组件需要的参数
      parentJexcelInstance: null, //自定义的表格组件需要的参数
      isTileMode: false, //自定义的表格组件需要的参数，是否平铺模式
      tileModeParent: null, //自定义的表格组件需要的参数，平铺模式时指向父组件

      dialogVisible: false,
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res)
      if (res.url.startsWith("/") && this.action.startsWith("http")) {
        let urls = this.action.split("/");
        res.url = urls[0] + "//" + urls[2] + `${this.tokenBridge}` + res.url;
        console.log(res.url);
      }
      this.value = res.url;
    },
    close(){
      this.dialogVisible = false; //取消按钮关闭图片弹窗
      // 支持平铺模式
      if (this.isTileMode && this.tileModeParent) {
        this.tileModeParent.closeEdit(this.cell, false)
      }
    },
    closedialog(e) {
      this.dialogVisible = false; //确定按钮关闭图片弹窗
      if (this.parentJexcelInstance && this.cell) {
        if (this.isTileMode) {
          this.parentJexcelInstance.updateCell(
            this.cell.getAttribute("data-x"),
            this.cell.getAttribute("data-y"),
            this.value,
            true
          );
        } else {
          this.parentJexcelInstance.closeEditor(this.cell, true);
        }
      }
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
