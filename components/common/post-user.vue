<template>
  <div class="post__details">
    <option-modal ref="optionModal" />
    <div class="post__details-block">
      <!-- <div class="img"> -->
      <!-- <img v-if="post.image" :src="post.image" alt=""> -->
      <div class="post__image" :class="randomNumber(1, 3) % 2 !== 0 ? 'bg-1' : 'bg-2'">
        <!-- <div class="status"></div> -->
      </div>
      <!-- </div> -->
      <div class="post__user">
        <div class="post__user-details">
          <h3>
            {{ post.owner.name.toLowerCase() }}
          </h3>
          <img src="/verified.png" alt="verified-user" v-if="randomNumber(1, 3) % 2 !== 0" />
          &nbsp;
          <span v-if="currentPage !== 'app'">
            <span v-if="isLoggedIn">• Following</span>
            <span v-else>
              •
              <nuxt-link style="color: #0095f6ff" to="/app">Follow</nuxt-link>
            </span>
          </span>
        </div>

        <small>Somewhere in the world</small>
      </div>
    </div>
    <div @click="showModal()">
      <app-menu />
    </div>
  </div>
</template>

<script>
import AppMenu from '~/components/icons/menu.vue'
import OptionModal from '~/components/common/option-modal.vue'
export default {
  props: {
    post: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    AppMenu,
    OptionModal
  },
  data() {
    return {}
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    },
    currentPage() {
      return this.$store.state.currentPage
    }
  },
  mounted() {
    // console.log(this.post)
    // console.log(document.querySelector('.post__image::after'))
  },
  methods: {
    showModal() {
      this.$refs['optionModal'].openModal(this.post)
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  &__details {
    background-color: var(--post-color);
    transition: background-color var(--transition-time);
    // position: relative;
    padding: 16px;
    display: flex;
    border-bottom: 0.5px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-block {
      display: flex;
      align-items: center;
      .img {
        // position: relative;
      }

      .post__user {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        color: var(--font-color-primary);
        &-details {
          margin-bottom: 7px;
          display: flex;
          align-items: center;
          img {
            width: 15px;
            height: 15px;
            display: block;
            margin-left: 3.5px;
          }
        }
        h3,
        small,
        span {
          line-height: 9px;
          display: block;
          font-size: 15px;
        }
        h3,
        span {
          cursor: pointer;
          font-weight: 600;
        }
      }
    }
    svg {
      cursor: pointer;
      fill: var(--icons-fill);
    }
  }
  &__image {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: linear-gradient(139deg, #fb8817, #ff4b01, #c12127, #e02aff);
    // display: none;
    position: relative;
    cursor: pointer;
    // z-index: 111;
    display: flex;
    align-items: center;
    // &:nth-child(2n+1){
    //     background: #0f0;
    // }

    &::after {
      content: ' ';
      display: block;
      width: 25px;
      height: 25px;
      // background-color: #eee;
      background-size: cover;
      border: 2px solid white;
      border-radius: 50%;
      position: absolute;
      top: 52%;
      left: 52%;
      transform: translate(-52%, -52%);
    }
  }
}
.modal-menu {
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: #eee;
  z-index: 9999;
}
.bg-1 {
  &::after {
    background-image: url('/profile-image.jpg');
  }
}
.bg-2 {
  &::after {
    background-image: url('/profile-pic.jpeg');
  }
}
</style>
