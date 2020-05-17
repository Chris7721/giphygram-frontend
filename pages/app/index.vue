<template>
    <div class="post_body">
        <!-- <pull-to :top-load-method="pull"> -->
            <!-- <ul v-for="item in dataList">
                <li>{{ item }}</li>
            </ul> -->
        <!-- </pull-to> -->
        <div v-if="!postFetched" class="mt-20 pl-10 pr-10">
           <template v-for="(loader, index) in 4">
                <instagram-loader :key="index" />
            </template> 
        </div>
        
            
       
        
        <div class="postss" v-if="postFetched">
            <template v-for="(post, index) in posts">
                <gif-post :key="index" :post="{...post, index}" class="content" />
            </template>
            
        </div>
        <infinite-loading @infinite="fetchMorePosts" spinner="waveDots">
                    <div slot="no-more" @click="backtoTop()">No more feeds. Back to <span>&#x1F446;</span> </div>
                    <div slot="no-results">No result</div>
        </infinite-loading>

        <transition name= "fade">
        <app-feedback v-if="linkCopiedd">
            <template v-slot:feedback><p>{{ $store.state.actionText }}</p></template>
        </app-feedback>
        </transition>
    </div>
</template>

<script>
import GifPost from '~/components/common/gifpost.vue'
import { InstagramLoader } from 'vue-content-loader'
import InfiniteLoading from 'vue-infinite-loading';


export default {
    layout: "authenticated",
    data(){
        return{
            skip: 0,
            limit: 4
        }
    },
    computed:{
        linkCopiedd(){
            return this.$store.state.linkCopied
        },
        posts(){
           return this.$store.state.posts
        },
        postFetched(){
            return this.$store.state.postsFetched
        }
    },
    components: {
        GifPost,
        InstagramLoader,
        InfiniteLoading,
    },
    async mounted(){
         this.$store.dispatch("fetchPosts", {limit: this.limit, skip: this.skip})
        .then(()=>{
            this.skip += 4
        })
        .catch()
        
    },
    methods: {
        async fetchMorePosts($state){

            const posts = await this.$store.dispatch("fetchPosts", {limit: this.limit, skip: this.skip})
            console.log(posts)
                if(posts.length > 0){
                    this.skip += 4
                    $state.loaded();
                }
                else{
                    console.log($state)
                    $state.complete();
                }
        },        
    }
}
</script>

<style lang="scss" scoped>
    .postss, .post_body{
        margin: 0 auto;
    max-width: 700px;
    position: relative;
    width: 100%;

    .content:last-child{
        @include respond-before-phone {
        // margin-bottom: 60px;
      }
            
    }
    }
    .post_body{
        // background-color: #0f0
    }
</style>