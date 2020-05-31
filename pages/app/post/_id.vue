<template>
    <div>
        <template>
          <template v-if="!singlePostFetched">
            <div style="max-width: 819px;margin: 0 auto;">
              <instagram-loader class="mt-20" />
            </div>
                  
              </template>
            <div class="post_view" v-if="singlePostFetched && post">
              
              <template>
                  <div class="post_view-top">
                    <app-user :post="post" /> 
                  </div>
                  
                  <div class="post_view-img">
                      <image-card :post="post" />
                  </div>
                  <div class="post_view-info">
                    <div class="user">
                        <app-user :post="post" />
                      </div>                 
                  <div class="action">
                  <app-action :post="post"/>   
                  </div>
                    
                  </div>
              </template>
              
                
            </div>
            <template v-if="singlePostFetched && !post">
                  <div class="message">
                      <div class="message__body">
                          <img src="/empty.svg" class="small" alt="">
                      <h2>Post might have been deleted.</h2>
                      </div>
                      
                  </div>
              </template>
        </template>
         
    </div>

</template>

<script>

import ImageCard from '~/components/common/image-card.vue'
import AppAction from '~/components/common/post-actions.vue'
import AppUser from '~/components/common/post-user.vue'
import { InstagramLoader } from 'vue-content-loader'
export default {
    layout: "authenticated",
    components:{
        AppUser,
        AppAction,
        ImageCard,
        InstagramLoader
    },
    head () {
    return {
      title: this.pageHead,
    }
  },
    data(){
        return{
            loading: true,
        }
    },
    computed: {
      singlePostFetched(){
            return this.$store.state.singlePostFetched
        },
        post(){
          // const position = this.$store.state.posts.findIndex(el => el._id == this.$route.params.id)
          // return this.$store.state.posts[position]
          return this.$store.state.singlePost
        },
        linkCopiedd(){
            return this.$store.state.linkCopied
        },
        pageHead(){
          if(this.singlePostFetched && this.post){
            return `Post by ${this.post.owner.name.toLowerCase()}`
          }
          return 'A Giphygram post'
        }
    },
    async mounted(){
      // console.log('The nama is: ', this.$route.name)
      // console.log("in unique post")
        if (this.$route.params.id) {
        await this.$store.dispatch("fetchSinglePost", this.$route.params.id);
        // console.log(this.posts)
      } else {

      }
    }
}
</script>

<style lang="scss" scoped>
.post_view{
    height: 80vh;
    max-width: 819px;
    margin: 0 auto;
    border: 1px solid #eee;
    display: flex;
    align-items: stretch;
    @include respond-tablet {
        // margin: -20px auto 0;
        // width: 100%
      }
    @include respond-before-phone {
        flex-direction: column;
        border: none;
        width: 100%;
        margin: 0 auto;
      }
      
    // flex-wrap: wrap;
    &-top{
        display: none;
        @include respond-before-phone {
        display: block;
      }
    }

    &-img{
        width: 60%;
        height: 100%;
        @include respond-tablet {
        width: 55%;
      }@include respond-before-phone {
        width: 100%;
      }
        img{
            width: 100%;
        height: 100%;
        }
    }
    &-info{
        width: 40%;
        display: flex;
        flex-direction: column;
        @include respond-tablet {
        width: 45%;
      }
      @include respond-before-phone {
        width: 100%;
        margin-bottom: 61px;
      }
    //   @include respond-before-phone {
    //             margin-bottom: 0;
    //         }

      .user{
         @include respond-tablet {
        // display: none;
      }
      @include respond-before-phone {
        display: none;
      } 
      }

        .action{
            // padding: 16px;
            flex-grow: 1;
        }
    }
}
</style>