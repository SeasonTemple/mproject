<template>
  <div id="main">
      {{ msg }}
  </div>
</template>

<script>
export default {
    name: "main",
    data(){
        return{
            msg: 'main dese'
        }
    }
}
</script>

<style>
   #main{
       z-index: -1000;
   }
</style>