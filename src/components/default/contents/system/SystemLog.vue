<template></template>

<script>
export default {
  name: "systemLog",
  data() {
    return {};
  },
  methods: {
    errorLog() {
      
    }
  },
  mounted() {
    this.config.errorHandler();
    this.config.warnHandler();
  }
};
</script>

<style>
</style>