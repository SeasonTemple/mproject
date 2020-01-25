<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>
<style src="../../assets/css/commons.css"></style>
<style>

  .el-container {
    overflow: hidden;
  }

  html,
  body,
  #base,
  .el-container {
    padding: 0 0;
    margin: 0px;
    height: 100%;
    width: 100%;
  }

  #base {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #side-main {
    background-color: gainsboro;
  }

  .el-aside{
    overflow: hidden;
  }
</style>