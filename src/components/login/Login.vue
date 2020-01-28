<template>
    <div id="parent">
        <el-form id="userFrom">
          <el-row>
           <el-button type="success" plain size="medium">{{mode}}</el-button>
          </el-row>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      let mode = 'login';
      return {
        mode
      }
    },
    methods: {

    },
    computed: {

    }

  }
</script>

<style scoped src="@/assets/css/login.css"></style>
