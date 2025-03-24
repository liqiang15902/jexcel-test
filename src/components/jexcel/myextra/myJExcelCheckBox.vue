<template>

  <el-select
    v-model="value"
    :allow-create="allowCreate"
    :multiple="multiple"
    :default-first-option="defaultFirstOption"
    :automaticDropdown="automaticDropdown"
    :placeholder="placeholder"
    :filterable="filterable"
    @visible-change="visibleChange"
    @change ="onChange"

  >
    <el-option
      v-for="item in optionss"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    >
    </el-option>
  </el-select>


</template>

<script>
import jexcel from "@/components/jexcel/jexcel";
import http from "@/components/http";

export default {
  name: "myJExcelCheckBox",
  props: {
    allowCreate: {
      // 必须filterable为true，allowCreate才会生效。为了更好体验，最好defaultFirstOption需要一起选中
      type: Boolean,
      default: true,
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    defaultFirstOption: {
      type: Boolean,
      default: true,
    },
    automaticDropdown: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array,
      default: function () {
        return [];
      },
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
  },
  data() {
    return {
      value: null, // 自定义的表格组件需要的参数
      cell: null, // 自定义的表格组件需要的参数
      parentJexcelInstance: null,//自定义的表格组件需要的参数
      isTileMode: false,  //自定义的表格组件需要的参数，是否平铺模式
      tileModeParent: null, //自定义的表格组件需要的参数，平铺模式时指向父组件

      extra: "",
      headers: "",


      optionss: [],
    }
  },

  methods:{
    visibleChange() {
      console.log(this.value);
      console.log(1212);
      console.log(this.options);
      this.optionss = JSON.parse(JSON.stringify(this.options));
      if (this.value.length) {
        if (this.value.includes("admin")) {
          this.optionss.forEach((element) => {
            this.$set(element, "disabled", true);
          });
        } else {
          this.optionss.forEach((element) => {
            this.$set(element, "disabled", false);
          });
        }
      }
    },
    onChange() {
       console.log(1212);
      console.log(this.value, this.cell);
      if (!this.multiple) {
        if (this.parentJexcelInstance && this.cell) {
          if (this.isTileMode){
            this.parentJexcelInstance.updateCell(this.cell.getAttribute('data-x'), this.cell.getAttribute('data-y'), this.value, true)
          } else {
            this.parentJexcelInstance.closeEditor(this.cell, true)
          }
        }
      }
    },


  },
};
</script>

<style scoped>
/* 修改风格，和jexcel一致*/
/deep/ .el-input__inner {
  border: 0px;
  border-radius: 0px;
  outline: 0px;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  padding-right: 30px;
  /*padding-right:2px;*/
  background-color: transparent;
  box-sizing: border-box;
}
/deep/ .el-select__tags {
  border: 0px;
  border-radius: 0px;
  outline: 0px;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  /*padding-right:2px;*/
  background-color: transparent;
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
