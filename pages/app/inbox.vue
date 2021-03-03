<template>
  <div>
    <template v-for="(num, index) in 12">
      <div class="notification" :key="index" v-if="!pageLoaded">
        <inbox-loader />
      </div>
    </template>
    <div v-if="pageLoaded" class="message">
      <div class="message__body">
        <img src="/inbox.svg" alt="" />
        <h2>No new message</h2>
      </div>
    </div>
  </div>
</template>

<script>
import InboxLoader from '~/components/loaders/inbox-loader.vue'
export default {
  layout: 'authenticated',
  head() {
    return {
      title: 'Giphygram | Inbox'
    }
  },
  components: {
    InboxLoader
  },
  data() {
    return {
      pageLoaded: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.pageLoaded = true
    }, 1500)
  }
}
</script>
