<template>
  <div id="main">
    {{ msg }}
  </div>
</template>

<script>
  export default {
    name: "main",
    data() {
      return {
        msg: 'main dese'
      }
    }
  }
</script>

<style>
  #main {
    background-color: rgba(11, 111, 1, 0.5);
    height: 100%;
  }
</style>