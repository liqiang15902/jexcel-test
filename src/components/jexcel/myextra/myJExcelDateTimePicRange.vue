<template>
  <div>
    <!-- <el-date-picker
        ref="myElDataPick"
        :type="type"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="onchange"
        v-model="value"></el-date-picker> -->
        <el-date-picker
       ref="myElDataPick"
      v-model="value"
      type="datetimerange"
      value-format="yyyy-MM-dd HH:mm:ss"
      @change="onchange">
    </el-date-picker>

  </div>
</template>

<script>
import jexcel from "@/components/jexcel/jexcel";

export default {
  name: "myJExcelDatePicker",
  props: {
    // valueFormat: {
    //   type: String,
    //   default: 'yyyy-MM-dd'
    // },
    type: {
      type: String,
      default: 'datetime'
    }
  },
  data() {
    return {
      value: null,        // 自定义的表格组件需要的参数
      cell: null,         // 自定义的表格组件需要的参数
      parentJexcelInstance: null,//自定义的表格组件需要的参数
      isTileMode: false,  //自定义的表格组件需要的参数，是否平铺模式
      tileModeParent: null, //自定义的表格组件需要的参数，平铺模式时指向父组件
    }
  },
  methods: {
    onchange() {
      // console.log('onchange', this.parentJexcelInstance, this.cell)
      console.log(this.value,'this.value')
      this.value = JSON.stringify(this.value)
      console.log(this.value,typeof this.value,'this.value')
      if (this.parentJexcelInstance && this.cell) {
        if (this.isTileMode){
          this.parentJexcelInstance.updateCell(this.cell.getAttribute('data-x'), this.cell.getAttribute('data-y'), this.value, true)
        } else {
          this.parentJexcelInstance.closeEditor(this.cell, true)
        }
      }
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
  padding-left:30px;
  background-color:transparent;
  box-sizing: border-box;
}
/deep/ .el-select__tags {
  border:0px;
  border-radius:0px;
  outline:0px;
  width:100%;
  height: 100%;
  margin:0px;
  padding:0px;
  /*padding-right:2px;*/
  background-color:transparent;
  box-sizing: border-box;
}
/* 下面设置右侧按钮居中 */
/deep/ .el-input__icon {
  line-height: inherit;
}
/deep/ .el-input__suffix-inner {
  display: inline-block;
}
</style>
