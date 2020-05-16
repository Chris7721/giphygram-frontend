<template>
    <div class="search mt-20">
        <div class="search__box">
            <input type="text" class="search__input" placeholder="Search for a user here">
        </div>

        <div v-if="!postFetched" class="mt-20 pl-10 pr-10">
           <template v-for="(loader, index) in 4">
                <content-loader :key="index" />
            </template> 
        </div>

        <div class="search__highlight" v-if="postFetched">
            <template v-for="(post, index) in posts">
                <div :key="index" class="search__highlight-post" :style="`grid-row-end: span ${randomNumber(3, 6)};`">
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

        <infinite-loading @infinite="fetchMorePosts" spinner="waveDots">
                    <div slot="no-more" @click="backtoTop()">No more feeds. Back to <span>&#x1F446;</span> </div>
                    <div slot="no-results">No results</div>
        </infinite-loading>
           

    </div>
</template>

<script>
import AppComment from '~/components/icons/comment.vue'
import AppHeart from '~/components/icons/heart.vue'
import AppPlay from '~/components/icons/play-icon.vue'
import AppStack from '~/components/icons/stack.vue'
import InfiniteLoading from 'vue-infinite-loading';
import { ContentLoader } from 'vue-content-loader'
export default {
    layout: "authenticated",
    components: {
        AppComment,
        AppHeart,
        AppPlay,
        AppStack,
        InfiniteLoading,
        ContentLoader
    },
    data(){
        return{
            skip: 0,
            limit: 16
        }
    },
    computed:{
        posts(){
           return this.$store.state.posts
        },
        postFetched(){
            return this.$store.state.postsFetched
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
        var header = document.querySelector(".search__box");
        var sticky = header.offsetTop;
        await this.$store.dispatch("fetchPosts", {limit: this.limit, skip: this.skip, from: 'search'});
        this.skip += 16
        window.onscroll = function() {
            if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
        };
    },

    methods: {
        async fetchMorePosts($state){
            this.skip += 16
            const posts = await this.$store.dispatch("fetchPosts", {limit: this.limit, skip: this.skip, from: 'search'})
            console.log(posts)
                if(posts.length > 0){
                    
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
    .search{
        max-width: 819px;
        margin: 0 auto;
        background-color: #fafafa;

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

        &__input{
            margin: 0 auto;
            height: 38px;
            max-width: 500px;
            padding: 11px 10px;
            background: #fafafa;
            font-size: 13px;
            padding: 3px 10px 3px 26px;
            border-radius: 3px;
            border: 1px solid #dbdbdb;
                &::placeholder{
                    text-align: center;
                    color: #dbdbdb;
                }
                @include respond-phone {
                    width: 85%;
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