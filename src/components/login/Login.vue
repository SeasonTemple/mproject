<template>
  <div class="cover">
    <div class="parent">
      <el-form class="userFrom">

      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      let mode = 'login';
      return {
        mode,
      }
    },
    methods: {

    },
    computed: {

    },
    mounted() {

    }

  }
</script>

<style scoped src="@/assets/css/login.css"></style>
<style>
  @keyframes bg {
    0% {
      background-color: brown;
    }

    25% {
      background-color: cadetblue;
    }

    50% {
      background-color: aquamarine;
    }

    75% {
      background-color: coral;
    }

    100% {
      background-color: brown;
    }
  }

  body {
    background-color: rgba(32, 31, 34, 0.068)
      /* animation: bg 5s ease-in-out infinite; */
  }
</style>