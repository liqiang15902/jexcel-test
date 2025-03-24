<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click="dialogVisible = true">
      上传图片
    </el-button>
    <el-dialog append-to-body :visible.sync="dialogVisible">
      <el-upload
        multiple
        :limit="limit"
        :file-list="fileList"
        :show-file-list="true"
        :on-exceed="onExceed"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :http-request="submitUpload"
        accept=".jpg,.png,.jpeg"
        class="editor-slide-upload"
        action=""
        list-type="picture-card"
      >
        <el-button size="small" type="primary">选择文件</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </el-dialog>
  </div>
</template>

<script>

// import { BASE_PATH } from '@/config'
// import http from '@/utils/http'
import axios from 'axios'
export default {
  name: 'EditorSlideUpload',
  props: {
    headers:{
       type: Object,
      default: {}
    },
    color: {
      type: String,
      default: '#1890ff'
    },
    limit: {
      type: Number | String,
      default: 9
    }
  },
  data () {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  mounted() {
    console.log(this.headers)
  },
  methods: {
    onExceed (files, fileList) {
      this.$utils.toast.error(`当前文件不可超出${this.limit}份`)
    },
    checkAllSuccess () {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit () {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传完成后再提交')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess (response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.data.url
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove (file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload (file) {
      const _self = this
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        if (file.size / 1024 / 1024 >= 30) {
          const errMsg = '上传文件不得大于 30MB！'
          this.$utils.toast.error(errMsg)
          reject(new Error(errMsg))
        }
        _self.listObj[fileName] = { hasSuccess: false, uid: file.uid }
        resolve(true)
      })
    },
    submitUpload (content) {
      console.log(content)
      console.log('submitUpload')
      const _this = this
      const formData = new FormData()
      formData.append('file', content.file)
        axios.post('/file/upload/ent', formData, {headers: this.headers}).then(res =>{
          this.$message.success('上传成功')
          console.log(res)
           _this.handleSuccess(res, content.file)
           console.log( _this.handleSuccess(res, content.file))
        })
      // const options = {
      //   headers: {
      //     Authorization: http.commonRequestHeader.Authorization
      //   },
      //   url: `${BASE_PATH}file/upload`,
      //   type: 'POST',
      //   data: formData,
      //   async: false,
      //   cache: false,
      //   contentType: false,
      //   mimeType: 'multipart/form-data',
      //   processData: false,
      //   success (data) {
      //     _this.$utils.toast.success('上传成功')
      //     data = JSON.parse(data)
      //     _this.handleSuccess(data, content.file)
      //   },
      //   error (error) {
      //     _this.$utils.toast.error(error.statusText)
      //   }
      // }
      // $.ajax(options)
    }
  }
}
</script>

<style  scoped>
.editor-slide-upload {
  margin-bottom: 20px;
 /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
