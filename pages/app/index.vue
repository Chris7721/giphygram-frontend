<template>
  <div class="post_body">
    <!-- <h2>{{ shouldFetch }}dhuwei</h2> -->
    <div v-if="!postFetched" class="mt-20 pl-10 pr-10">
      <template v-for="(loader, index) in 4">
        <instagram-loader class="mt-20" primaryColor="var(--loader-primary)" secondaryColor="var(--loader-secondary)" :key="index" />
      </template>
    </div>
    <div class="postss" v-if="postFetched">
      <template v-for="(post, index) in posts">
        <gif-post :key="index" :post="{...post, index}" class="content" />
      </template>
    </div>
    <div class="message" v-if="postFetched && posts.length < 1">
      <div class="message__body">
        <img class="small" src="/error.svg" alt="" />
        <h2>Something went wrong while fetching posts</h2>
      </div>
    </div>
    <infinite-loading @infinite="fetchMorePosts" spinner="waveDots" v-if="postFetched && posts.length > 3">
      <div slot="no-more" @click="backtoTop()">
        No more feeds. Back to
        <span>&#x1F446;</span>
      </div>
      <div slot="no-results">No result</div>
    </infinite-loading>
  </div>
</template>

<script>
import GifPost from '~/components/common/gifpost.vue'
import {InstagramLoader} from 'vue-content-loader'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  layout: 'authenticated',
  head() {
    return {
      title: 'Giphygram'
    }
  },
  data() {
    return {
      limit: 4
    }
  },
  computed: {
    linkCopiedd() {
      return this.$store.state.linkCopied
    },
    posts() {
      return this.$store.state.posts
    },
    postFetched() {
      return this.$store.state.postsFetched
    },
    shouldFetch() {
      return this.$store.state.posts.length < 1 ? true : false
    },
    skip() {
      return this.$store.state.feedsSkip
    }
  },
  components: {
    GifPost,
    InstagramLoader,
    InfiniteLoading
  },
  async mounted() {
    if (this.shouldFetch) {
      this.$store
        .dispatch('fetchPosts', {limit: this.limit, skip: this.skip})
        .then(() => {
          this.$store.commit('set_feeds_skip', this.skip + 4)
        })
        .catch()
    }
  },
  methods: {
    async fetchMorePosts($state) {
      const posts = await this.$store.dispatch('fetchPosts', {limit: this.limit, skip: this.skip})
      // console.log(posts)
      if (posts.length > 0) {
        this.$store.commit('set_feeds_skip', this.skip + 4)
        $state.loaded()
      } else {
        // console.log($state)
        $state.complete()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// min-height: 80px;
// min-height: 45px;
.postss {
}
.postss,
.post_body {
  max-width: 700px;
  position: relative;
  width: 100%;
  .content {
    position: relative;
  }
  .content:last-child {
    @include respond-before-phone {
      // margin-bottom: 60px;
    }
  }
}
.post_body {
  margin: 0 auto;
}
</style>
