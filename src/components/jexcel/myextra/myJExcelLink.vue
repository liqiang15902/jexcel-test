<template>
<div>
  <el-link @click="onclick" :icon="icon" :type="type">{{ text }}</el-link>
</div>
</template>

<script>
export default {
  name: "MyJExcelLink.vue",
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: null,        // 自定义的表格组件需要的参数
      cell: null,         // 自定义的表格组件需要的参数
      textFilter: null, // 计算展示值的方法
      clicked: null,    // 链接点击之后的方法
    }
  },
  computed:{
    text(){
      if (this.textFilter) return this.textFilter(this.value)
      return this.value
    }
  },
  methods:{
    onclick(){
      if (this.clicked) this.clicked(this.cell)
    }
  }
}
</script>

<style scoped>

</style>
