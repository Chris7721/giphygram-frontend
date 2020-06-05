<template>
  <div v-if="loading" class="custom-loading" >
      <div class="custom-loading-inner"></div>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-loading {
  position: fixed;
  z-index: 999999999;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
//   animation: loader 1s linear forwards;
  background: linear-gradient(90deg, rgb(100, 91, 83) 0%, rgb(235, 82, 82) 18.23%, rgb(247, 143, 47) 34.37%, rgb(244, 193, 81) 48.96%, rgb(82, 187, 118) 66.15%, rgb(38, 165, 215) 82.29%, rgb(224, 105, 183) 100%);
    &-inner{
        opacity: 0;
        width: 100%;
        height: 100%;
        // background: #f00;
        animation: change-bg 2s linear 1s infinite forwards;
    }
}

</style>