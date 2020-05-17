<template>
        <form @submit.prevent="login" autocomplete="off">
            <div v-if="hasError" class="hasError mb-10"><p>Invalid Email or password <span>&#x1F636;</span></p></div>
      <div class="cont_detail form-group">
        <div class="mb-10 holder">
          <input type="text" placeholder="Email" name="email" v-model="details.email">
        </div>
        <div class="mb-20 holder">
          <input type="password" placeholder="Password" name="password" v-model="details.password">
        </div>
        
      <social-button 
      :disabled="validation.password != 'valid-input'
      || validation.email != 'valid-input'"
      :loadig="logging_in">Log in &#x1F9D0;</social-button>
      <div class="divider mb-20"><h2>OR</h2></div>
      <div class="option">
        <div class="option_top">
          <facebook-icon />
        <h3>Log in with Facebook</h3>
        </div>
        <p class="mt-20 mb-10">Forgot password?</p>
      </div>
      
      </div>
    </form>
</template>

<script>


import FacebookIcon from '~/components/icons/facebook-icon'
export default {
    components: {
      FacebookIcon
    },
    data(){
      return{
        details:{
          email: '',
          password: ''
        },
        validation: {
            email: '',
            password: '',
        },
        logging_in: false,
        hasError: false
      }
    },
    computed: {
      disabled(){
        return !this.validateEmail(this.details.email) && this.details.password.length >= 2
      }
    },
    watch: {
        "details.email": function(newVal) {
            this.validation.email = this.validateEmail(newVal) != "" ? "valid-input" : "invalid-input";
            },
            "details.password": function(newVal) {
            this.validation.password = newVal != "" ? "valid-input" : "invalid-input";
            },
    },
    methods: {
      async login(){
        this.logging_in = true
        const element = document.querySelector('#loginLoader')
        const overlay = document.querySelector('.form_overlay')
        overlay.style.display = "block"
        element.classList.add("anim-loader")
        this.$store.dispatch("login", this.details).then((resp)=>{
          // console.log(resp)
          this.logging_in = false
          element.classList.remove("anim-loader")
           overlay.style.display = "none"
        })
        .catch(err=>{
            this.hasError = true;
          element.classList.remove("anim-loader")
           overlay.style.display = "none"
          console.log(err)
        })
      }
    }
}
</script>

<style lang="scss" scoped>

</style>