<template>
    <div class="search mt-20">
        <!-- <div class="search__box">
            <input type="text" class="search__input" placeholder="Search for a user here">
        </div> -->

        <div v-if="!postFetched" class="mt-20 search__highlight">
           <template v-for="(loader, index) in 13">
               <div class="search__highlight-post" :key="index" :style="`grid-row-end: span ${randomNumber(3, 6)}; opacity: 1 !important`">
                   <search-loader />
               </div>
                
            </template> 
        </div>

        <div class="search__highlight" v-if="posts.length > 1 && postFetched">
            <template v-for="(post, index) in posts">
                <div :key="index" class="search__highlight-post search__highlight-loop" :style="`grid-row-end: span ${randomNumber(3, 6)};`">
                    <img :src="post.giphy" alt="">
                    <app-play class="play" v-if="index % 2 == 0" />
                    <app-stack class="play" v-if="index % 2 !== 0" />
                    <nuxt-link :to="`/app/post/${post._id}`">
                    <div class="search__highlight-post--info">
                        
                        <div class="details">
                            <div class="commentsCount">
                                <app-comment />
                                <h2>{{ post.commentsCount }}</h2>
                            </div>
                            <div class="likesCount">
                                <app-heart />
                                <h2>{{ post.likesCount }}</h2>
                            </div>
                        </div>
                        
                    </div>
                    </nuxt-link>
                </div>
            </template>            
        </div>

        <infinite-loading @infinite="fetchMorePosts" spinner="waveDots" v-if="posts.length > 1 && postFetched">
                    <div slot="no-more" @click="backtoTop()"></div>
                    <div slot="no-results"></div>
        </infinite-loading>
           

    </div>
</template>

<script>
import AppComment from '~/components/icons/comment.vue'
import AppHeart from '~/components/icons/heart.vue'
import AppPlay from '~/components/icons/play-icon.vue'
import AppStack from '~/components/icons/stack.vue'
import InfiniteLoading from 'vue-infinite-loading';
import SearchLoader from '~/components/loaders/search-loader.vue'
export default {
    layout: "authenticated",
    components: {
        AppComment,
        AppHeart,
        AppPlay,
        AppStack,
        InfiniteLoading,
        SearchLoader
    },
    head () {
    return {
      title: 'Giphygram | Explore',
    }
  },
    data(){
        return{
            limit: 15,
            test: false,
            prevLength: 0
        }
    },
    computed:{
        posts(){
           return this.$store.state.searchPosts
        },
        postFetched(){
            return this.$store.state.postsFetched
        },
        shouldFetch(){
            return this.$store.state.searchPosts.length < 1 ? true : false
        },
        skip(){
           return this.$store.state.searchSkip
        },
        fixHeader(){
            
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
        }
    },
    async mounted(){
        // console.log("called mounted")
        // var header = document.querySelector(".search__box");
        // var sticky = header.offsetTop;
        if(this.shouldFetch){
           const posts = await this.$store.dispatch("fetchPosts", {limit: this.limit, skip: this.skip, from: 'search'});
        this.loopPosts(0, posts.length - 1)
        this.prevLength = posts.length 
        this.$store.commit("set_search_skip", this.skip + 15)
        
        }
        else{
            const posts = document.getElementsByClassName('search__highlight-loop')
            for(let i = 0; i <= posts.length-1; i++){
                posts[i].style.opacity = 1;
            }
        }
        // this.loopPosts(0, this.posts.length - 1, false)
        // this.prevLength = this.posts.length 
        
        // window.onscroll = function() {
        //     if (window.pageYOffset > sticky) {
        //     header.classList.add("sticky");
        // } else {
        //     header.classList.remove("sticky");
        // }
        // };
    },

    methods: {
        async fetchMorePosts($state){
            // console.log("called infinirte")
            // console.log("The length is: ", this.posts.length)
            const posts = await this.$store.dispatch("fetchPosts", {limit: this.limit, skip: this.skip, from: 'search'})
            // console.log(this.posts)
                if(posts.length > 0){
                    this.$store.commit("set_search_skip", this.skip + 15)
                    this.loopPosts(this.prevLength, this.prevLength + posts.length)
                    this.prevLength = posts.length
                    
                    // this.loopPosts(0, posts.length - 1)
                    $state.loaded();
                }
                else{
                    // console.log("completed fetching")
                    $state.complete();
                }
        },  
        loopPosts(start, end){
            const posts = document.getElementsByClassName('search__highlight-loop')
            for(let i = start; i <= end; i++){
                if(this.skip < 1){
                    setTimeout(()=>{
                        posts[i].classList.add('show');
                    }, 200 * i)
                }
                 
            }
        }      
    }
}

</script>

<style lang="scss" scoped>
    .search{
        max-width: 819px;
        margin: 0 auto;
        background-color: var(--bg);
        transition: background-color var(--transition-time);

        &__box{
            height: 55px;
            background-color: #fafafa;
            // margin: 20px auto;
            display: none;
                @include respond-before-phone {
                    display: flex;
                    align-items: center;
                justify-content: center;
                }
        }

        

        &__highlight{
            display: grid;
            grid-gap: 20px;
            // grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            // @include respond-before-phone {
            //     grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
            // }
            grid-template-columns: 1fr 1fr 1fr;
            grid-auto-rows: 40px;
            @include respond-before-phone {
                grid-gap: 8px;
            }
            @include respond-phone {
                grid-gap: 3px;
            }

            &-post{
                width: 100%;
                height: 100%;
                position: relative;
                overflow: hidden;
                opacity: 0;
                transition: all 1s;
                &.show{
                    animation: searchShow 250ms ease-in forwards !important;
                }
                @include respond-before-phone {
                // height: 125px;

                
            }
            .play{
                width: 25px;
                height: 25px;
                display: block;
                fill: #fff;
                position: absolute;
                right: 10px;
                top: 10px;
            }

            &:hover{
                .search__highlight-post--info{
                    // display: flex;
                    opacity: .6;
                }
                img{
                    animation: zoomInOut 6s linear forwards;
                }
            }
            &--info{
                background-color: #000;
                opacity: 0;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                cursor: pointer;
                align-items: center;
                justify-content: center;
                transition: opacity .1s ease-in-out;

                .details{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    @include respond-before-phone {
                        flex-direction: column;
                    }
                    :not(:last-child){
                        // margin-right: 20px;
                    }
                    .commentsCount, .likesCount{
                        display: flex;
                        align-items: center;
                        color: #fff;
                        font-weight: 600;
                        svg{
                            width: 30px;
                            height: 30px;
                            fill: white;
                            margin-right: 10px;
                            @include respond-before-phone {
                                width: 25px;
                                height: 25px;
                            }
                        }
                    }
                    .commentsCount{
                        margin-right: 30px;
                        @include respond-before-phone {
                            margin-right: 0;
                            margin-bottom: 15px;
                        }
                    }
                }
            }
                img{
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            }

        }
}
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1111;
}
</style>