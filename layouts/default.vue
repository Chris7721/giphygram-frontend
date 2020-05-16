<template>
  <div>
    <load-screen v-if="!appReady" />
    <div v-else-if="appReady">
      <nuxt />
    </div>
    
  </div>
</template>

<style>

</style>

<script>
import AuthHeader from '~/components/common/auth-header.vue'
export default {
    computed: {
    appReady(){
      return this.$store.state.appReady
    }
  },
  components: {
    AuthHeader
  }
}
</script>
