<template>
  <header class="header">
    <!-- :class="modalOpen ? 'behind' : ''" -->
    <default-auth-header v-if="currentPage == 'app' || $route.path.split('/')[3]" />
    <other-auth-header v-else>
      <template v-slot:left>
        <back-icon />
      </template>
      <template v-slot:center>
        <template v-if="currentPage == 'explore'">
          <input type="text" class="header__input oppo" :class="currentPage == 'explore' ? 'wide' : ''" placeholder="Search for a user here" />
        </template>
        <template v-else>
          {{ jsUcfirst(headerText) }}
        </template>
      </template>
      <template v-slot:right>
        <template v-if="currentPage == 'inbox'">
          <new-message />
        </template>
      </template>
    </other-auth-header>
    <new-post ref="newPostModal" />
  </header>
</template>

<script>
import DefaultAuthHeader from '~/components/common/default-auth-header.vue'
import OtherAuthHeader from '~/components/common/other-auth-header.vue'
import BackIcon from '~/components/icons/back-icon.vue'
import NewMessage from '~/components/icons/new-message.vue'
export default {
  components: {
    DefaultAuthHeader,
    OtherAuthHeader,
    BackIcon,
    NewMessage
  },
  data() {
    return {
      headerText: ''
    }
  },
  computed: {
    currentPage() {
      return this.$store.state.currentPage
    },
    modalOpen() {
      return this.$store.state.modalOpen
    }
  },
  watch: {
    currentPage(val) {
      this.headerText = val
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 111;
  width: 100%;
  min-height: 54px;
  padding: 0 80px;
  background-color: var(--nav-bg);
  transition: all var(--transition-time);
  border-bottom: 0.06px solid var(--header-border);

  @include respond-before-phone {
    padding: 0 15.5px;
  }

  &__input {
    margin: 0 auto;
    height: 30px;
    width: 250px;
    padding: 11px 10px;

    font-size: 13px;
    padding: 3px 10px 3px 26px;
    border-radius: 3px;
    transition: 0.7s all linear;

    &::placeholder {
      text-align: center;
      color: #dbdbdb;
    }
    @include respond-phone {
      width: 90% !important;
    }
  }
}
.behind {
  z-index: -111;
}
</style>
