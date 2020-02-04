<template>
  <canvas>
    <div id="parent">
      <el-form id="userFrom">

      </el-form>
    </div>
  </canvas>
</template>

<script>
  export default {
    name: 'login',
    data() {
      let mode = 'login';
      const STAR_COUNT = () => {
          this.getStars()
        },
        STAR_SIZE = 3,
        STAR_MIN_SCALE = 0.2,
        OVERFLOW_THRESHOLD = 50;

      const canvas = () => {
          this.getCanvas()
        },
        context = () => {
          this.getContext()
        };

      let scale = 1, // device pixel ratio
        width,
        height;

      let stars = [];

      let pointerX,
        pointerY;

      let velocity = {
        x: 0,
        y: 0,
        tx: 0,
        ty: 0,
        z: 0.0005
      };

      let touchInput = false;

      return {
        mode,
        STAR_COUNT,
        STAR_SIZE,
        STAR_MIN_SCALE,
        OVERFLOW_THRESHOLD,
        canvas,
        context,
        scale,
        width,
        height,
        stars,
        pointerX,
        pointerY,
        velocity,
        touchInput
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