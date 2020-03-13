<template>
  <section class="msgContainer">
    <template>
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <li v-for="i in count" class="infinite-list-item" :key="i">{{ i }}</li>
      </ul>
    </template>
  </section>
</template>
<script>
  export default {
    name: 'analyze',
    data() {
      let count = 0;
      return {
        count
      }
    },
    methods: {
      load() {
        this.count > 10 ? this.count : this.count++;
        // this.count += 2;
      }
    },
    mounted() {

    }
  }
</script>

<style scoped src=""></style>
<style>

</style>