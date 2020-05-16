<template>
    <form @submit.prevent="register" autocomplete="off">
            
      <div class="cont_detail form-group">
          
      <div class="option">
          <em>Sign up to see photos and fun gifs from your friends.</em>
        <div class="option_top mb-10 mt-10">
          <facebook-icon />
        <h3>Log in with Facebook</h3>
        </div>
      </div>

      <div class="divider mb-20">OR</div>
      <div class="hasError mb-20" v-if="hasError"><p>Seems like this email has already been used before <span>&#x1F636;</span></p></div>
        <div class="mb-10 holder">
          <input type="text" placeholder="Name" name="name" v-model="details.name">
        </div>
        <div class="mb-10 holder">
          <input type="text" placeholder="Email" name="email" v-model="details.email">
        </div>
        <div class="mb-20 holder">
          <input type="password" placeholder="Password" name="password" v-model="details.password" required>
        </div>
      <social-button 
      :disabled="validation.name != 'valid-input'
      || validation.password != 'valid-input'
      || validation.email != 'valid-input'"
      :loading="registering">Register &#x1F62C;</social-button>
            
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
          password: '',
          name: ''
        },
        validation: {
            email: '',
            password: '',
            name: ''
        },
        registering: false,
        hasError: false
      }
    },
    computed: {
      disabled(){
        return !(this.validateEmail(this.details.email) && this.details.password.length >= 0 && this.details.name.length >= 0)
      }
    },
    watch: {
        "details.email": function(newVal) {
            this.validation.email = this.validateEmail(newVal) != "" ? "valid-input" : "invalid-input";
            },
            "details.name": function(newVal) {
            this.validation.name = newVal.length > 2 != "" ? "valid-input" : "invalid-input";
            },
            "details.password": function(newVal) {
            this.validation.password = newVal != "" ? "valid-input" : "invalid-input";
            },
    },
    methods: {
      async register(){
        this.registering = true
        const element = document.querySelector('#loginLoader')
        const overlay = document.querySelector('.form_overlay')
        overlay.style.display = "block"
        element.classList.add("anim-loader")
        this.$store.dispatch("register", this.details).then((resp)=>{
        // console.log(resp)
          this.registering = false
          element.classList.remove("anim-loader")
           overlay.style.display = "none"
        })
        .catch(err=>{
            this.hasError = true;
          element.classList.remove("anim-loader")
           overlay.style.display = "none"
           this.registering = false
          console.log(err)
        })
      }
    }
}
</script>

<style lang="scss" scoped>

</style>