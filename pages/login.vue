<template>
  <div class="cont_cover">
    <div class="cont_body">
      <div class="cont">
        <div class="loader" id="loginLoader"></div>
        <div class="form_overlay"></div>
        <div class="header__logo login mb-40 mt-30">
          <nuxt-link to="/app">
            <h2>Giphygram&#x1F4F8;</h2>
          </nuxt-link>
        </div>
        <template v-if="currentPage == 'login'">
          <login-page />
        </template>
        <template v-else>
          <register-page />
        </template>
      </div>
      <div class="cont_info">
        <p>
          {{ currentPage == 'login' ? "Don't have an account?" : 'Have an account?' }}&nbsp;
          <span @click="updatePage">{{ currentPage == 'login' ? 'Sign up' : 'Log in' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import LoginPage from '~/components/common/login'
import RegisterPage from '~/components/common/register'
export default {
  components: {
    LoginPage,
    RegisterPage
  },
  head() {
    return {
      title: 'Giphygram | Login'
    }
  },
  data() {
    return {
      currentPage: 'login'
    }
  },

  methods: {
    updatePage() {
      if (this.currentPage == 'login') {
        this.currentPage = 'register'
        this.$router.push(`${this.$router.currentRoute.fullPath}/#register`)
      } else {
        this.$router.push('/login')
        this.currentPage = 'login'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
