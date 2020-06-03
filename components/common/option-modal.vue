<template>
    <div class="modal" v-if="modalOpen">
        <div class="modal__body" v-click-outside="closeModal">
            <div class="modal__list">
                <button class="modal__list-item modal__list-item--warning" @click="closeModal">Report Inappropriate &#x1F620;</button>
                <button class="modal__list-item modal__list-item--warning" @click="closeModal">Unfollow {{ post.owner.name.split(" ")[0] }} &#x1F4DB;</button>
                <button class="modal__list-item" @click="closeModal"><nuxt-link :to="`/app/post/${this.post._id}`">Go to post</nuxt-link>&#x1F449;</button>
                <button class="modal__list-item" @click="copyTextToClipboard(post._id)">Share &#x1F91D;</button>
                <button class="modal__list-item" @click="copyTextToClipboard(post._id)">Copy Link &#x26A1;</button>
                <button class="modal__list-item" @click="closeModal">Cancel &#x274C;</button>
            </div>
        </div>
    </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
    directives: {
      clickOutside: vClickOutside.directive
    },
    data(){
        return{
            modalOpen: false,
            post: {}
        }
    },
    methods: {
        openModal(post){
            this.post = post
            this.modalOpen = true
        },
        closeModal(){
            this.modalOpen = false
        },
        copyTextToClipboard(id){
            this.$store.commit("set_actionText", "Link Copied to your clipboard")
            this.copyToClipboard(id);
            this.closeModal()

        }
        
    }
}
</script>

<style lang="scss" scoped>
    .modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.6);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;

  &__body{
      background-color: #fff;
      width: 260px;
      max-height: calc(100% - 40px);
      margin: 20px;
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: modalAnim .1s ease-out forwards;
  }

  &__list{

      &-item, a{
          width: 100%;
          color: var(--font-color-primary);
          background-color: var(--bg);
          min-height: 48px;
          padding: 4px 8px;
          text-align: center;
          font-size: 15px;
          vertical-align: middle;
          font-family: 'Mukta';
          cursor: pointer;
          &:not(:last-child){
                border-bottom: 1px var(--border-color) solid;
            }
            &--warning{
                color: #ed4956;
                font-weight: 600;
            }

            &:focus{
                // background-color: #0f0;
            }
      }
  }
    }


</style>