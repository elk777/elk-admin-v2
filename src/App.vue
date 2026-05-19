<!--
 * @Author: elk LYF_elk@163.com@qq.com
 * @Date: 2023-05-26 16:57:52
 * @LastEditors: elk LYF_elk@163.com@qq.com
 * @LastEditTime: 2024-04-04 17:07:07
 * @FilePath: /vue2_project/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created() {
    console.log("初始化app");
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
