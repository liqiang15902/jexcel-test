<template>
  <div>
    <el-input ref="myinput" placeholder="请输入内容" @blur="$emit('blur')" v-model="value"></el-input>
    <!-- <el-dialog
      title="流程图预览"
      :visible.sync="dialogVisible"
      append-to-body
      width="800px"
    >
    <div>1111</div>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  name: "myJExcelInput",
  data() {
    return {
      value: null,        // 自定义的表格组件需要的参数
      cell: null,         // 自定义的表格组件需要的参数
      dialogVisible:false
    }
  },
  mounted() {
    this.$refs.myinput.select() 
  },
  methods: {
    focus(){
      console.log('focus called')
      this.$refs.myinput.focus()
      this.dialogVisible = true

    }
  }
}
</script>

<style scoped>
/* 修改风格，和jexcel一致*/
/deep/ .el-input__inner {
  border:0px;
  border-radius:0px;
  outline:0px;
  width:100%;
  height: 100%;
  margin:0px;
  padding:0px;
  padding-right:2px;
  background-color:transparent;
  box-sizing: border-box;
}
</style>
