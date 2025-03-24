<template>
    <el-select v-model="value"
               :allow-create="allowCreate"
               :multiple="multiple"
               :default-first-option="defaultFirstOption"
               :automaticDropdown="automaticDropdown"
               :placeholder="placeholder"
               :filterable="filterable"
               @change="onchange">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
</template>

<script>
import jexcel from "@/components/jexcel/jexcel";

export default {
  name: "myJExcelSelect",
  props: {
    allowCreate: {  // 必须filterable为true，allowCreate才会生效。为了更好体验，最好defaultFirstOption需要一起选中
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    defaultFirstOption: {
      type: Boolean,
      default: false
    },
    automaticDropdown: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: function () {
        return []
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
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
      if(!this.multiple) {
        if (this.parentJexcelInstance && this.cell) {
          if (this.isTileMode){
            console.log('select.isTileMode', this.cell.getAttribute('data-x'), this.cell.getAttribute('data-y'), this.value)
            this.parentJexcelInstance.updateCell(this.cell.getAttribute('data-x'), this.cell.getAttribute('data-y'), this.value, true)
          } else {
            this.parentJexcelInstance.closeEditor(this.cell, true)
          }
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
  padding-right:30px;
  /*padding-right:2px;*/
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
