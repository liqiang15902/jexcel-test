<template>
  <div>
    <div className="introduction" style="width: 50%; text-align: left">
      支持键盘快捷方式:<br>
      Tab保存值退出编辑模式并移动到右侧单元格<br>
      Enter保存值退出编辑模式并移动到下一行。<br>
      支持鼠标快捷方式<br>
      双击进入编辑模式<br>
      单击后再输入任意字符进行编辑模式<br>
      在组件外单击保存值退出编辑模式<br>
      由于element-ui的问题，暂时不支持Esc键。</div>
    <input
        type="button"
        value="Add new row"
        @click="jExcelObj.insertRow()"
    /><br/>
<!--    <el-link @click="jExcelObj.fullscreen()" type="primary">主要链接</el-link>-->
    <input
        type="button"
        value="Undo"
        @click="jExcelObj.undo()"
    />
    <input
        type="button"
        value="Redo"
        @click="jExcelObj.redo()"
    />
    <input
        type="button"
        value="Save"
        @click="jExcelObj.download()"
    /><br/>
    <input
        type="button"
        value="全屏"
        @click="jExcelObj.fullscreen()"
    /><br/>
    <div id="spreadsheet" ref="spreadsheet"></div>
    <el-divider></el-divider>
    <div id="spreadsheet2" ref="spreadsheet2"></div>
  </div>


</template>

<script type="text/ecmascript-6" src="./HelloWorld.js"></script>

<style scoped>
.spreadsheet {
  /* overflow-y:hidden;    jspread采用高度自动设定，所以jspread的滚动条不会出现，需要使用div的滚动条代替 */
  /* overflow-x:hidden;   jspread宽带必须手工设定，否则冻结窗口无效。采用jspread的滚动条，隐藏div的滚动太欧 */
  /* width: 100%; */
  /* height: 100%; */
}
</style>
