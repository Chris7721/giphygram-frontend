<template>
  <div>
    <template v-for="(num, index) in 12">
      <div class="notification" :key="index" v-if="!pageLoaded">
        <notifications-loader />
      </div>
    </template>
        <div  v-if="pageLoaded" class="message">
          <div class="message__body">
              <img class="small" src="/notification.svg" alt="">
              <h2>No new notifications</h2>
          </div>
          
      </div>
  </div>
</template>

<script>
import NotificationsLoader from '~/components/loaders/notifications-loader.vue'
export default {
    layout: "authenticated",
    head () {
    return {
      title: 'Giphygram | Notifications',
    }
  },
  components:{
    NotificationsLoader
  },
  data(){
    return{
      pageLoaded: false
    }
  },
  mounted(){
    setTimeout(()=>{
      this.pageLoaded = true
    }, 1500)
  }
}
</script>

<style lang="scss" scoped>

</style>