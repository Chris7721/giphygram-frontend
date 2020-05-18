<template>
<client-only>
  <div class="auth_body">
    <load-screen v-if="!appReady" />

    <div v-else-if="appReady">
      <auth-header />
    <nuxt />
    <bottom-nav />
    <div id="button_container" v-if="$store.state.token && postFetched">
  <button class="readButton" @click="showUploadModal">
    <div class="circle">
      <img src="/addpost.png" alt=""> 
    </div>
    <p class="labelText">New Post</p>
  </button>
</div>
<new-post ref="newPostModal" />
    </div>
    <transition name= "fade">
        <app-feedback v-if="uploadedPost && linkCopiedd">
            <template v-slot:feedback><p>{{ $store.state.actionText }}</p></template>
        </app-feedback>
  </transition>
  <transition name= "fade">
        <app-feedback v-if="linkCopiedd">
            <template v-slot:feedback><p>{{ $store.state.actionText }}</p></template>
        </app-feedback>
        </transition>
  </div>
  
</client-only>
</template>

<script>
import AuthHeader from '~/components/common/auth-header.vue'
import BottomNav from '~/components/common/bottom-nav.vue'
export default {
  date(){
    return{

    }
  },
  computed: {
    appReady(){
      return this.$store.state.appReady
    },
    postFetched(){
            return this.$store.state.postsFetched
    },
    uploadedPost(){
            return this.$store.state.uploadedPost
        },
    linkCopiedd(){
        return this.$store.state.linkCopied
    },
  },
  components: {
      AuthHeader,
      BottomNav
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
$background: #161a1b;
$white: #fcf9f9;
$green: #36e717;
$blue: #1b17e7;
$duration: 0.5s;
$property:all;
$ease: cubic-bezier(0.65,0,.076,1);
@mixin transition($property,$duration,$ease, $delay) {
    transition: $property $duration $ease $delay;
  }
  #button_container{
    position: fixed;
        bottom: 20px;
        left: 20px;
          @include respond-before-phone {
           display: none;
          }
  }
button {
  position: relative;
  display: inline-block;
  cursor: pointer;
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;
  font-size: inherit;
  font-family: inherit;
  &.readButton {
    width: 140px;
    height: auto;
    .circle {
      @include transition($property,$duration,$ease, 0s);
      position: relative;
      width: 3rem;
      height: 3rem;
      background: #fafafa;
      border-radius: 1.625rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0px 11px -1px rgba(0,0,0,1);
      img{
        position: absolute;
        left: 7.1875px;
        @include transition($property, .2s, $ease, 0.1s);
      }
    }
    .labelText {
      @include transition($property, $duration, $ease, 0.1s);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      color: #000;
      padding: 0.75rem 0;
      padding-left: .5rem;
      margin: 0 0 0 0.85rem;
      opacity: 0;
      font-weight: 700;
      line-height: 1.6;
      text-align: center;
      text-transform: uppercase;
    }
  }
  &:hover {
    .circle {
      width: 100%;
      
      img{
        transform: rotate(180deg);
        // left: 0;
      }
      .icon {
        &.arrow {
        background: $blue;
        transform: translate(2rem, 0);
        }
        &.arrow::before{
          border-top: 0.125rem solid blue;
          border-right: 0.125rem solid blue;
        }
      }
    }
    .labelText {
      opacity: 1;
       
    }
  }
}
    .auth_body{
    background-color: #fafafa;
      // @include respond-before-phone {
      //             background-color: #fff;
      // }  
      .addPost{
        width: 80px;
        position: fixed;
        bottom: 20px;
        left: 20px;
        display: flex;
        align-items: center;
        background-color: #0f0;
        padding: 10px 20px;
        border-radius: 50px;
        transition: width 1s; 

        &:hover{
          width: auto;
          .text{
            opacity: 1
          }
          .text.red{
            color: red;
          }
        }

        .text{
          font-weight: 600;
          font-size: 1.2em;
          opacity: 0;
          transition: all 3s; 
        }
      }  
  }
</style>