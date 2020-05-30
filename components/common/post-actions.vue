<template>
<no-ssr>
    <div style="height: 100%; display: flex; flex-direction: column" class="action-body">
                <div class="post__likes mt-10 pl-lr" v-if="post.likesCount > 0">
            <span class="content">Liked by <span class="username">{{ post.isLiked ? "You" : post.likes[0].user.split(" ")[0] }}</span> <span v-if="post.likesCount > 1"> and {{  post.likesCount-1 }} {{ post.likesCount >2 ? 'others' : 'other' }}</span></span>
        </div>
        <div class="post__actions mt-10 pl-lr">
            <div class="post__actions-interact">
                <div @click="likeUI(`interact-${post._id}`, post, $event)" role="button"><app-heart :class="[`interact-${post._id}`, post.isLiked ? 'liked' : '']" /></div>
                <div @click="$router.push(`/app/post/${post._id}`)" role="button"><app-comment /></div>
                <div>
                   <app-share /> 
                </div>
                
            </div>
            <div class="post__actions-bookmark" @click="showMessage(`bookmark-${post.index}`)">
                <app-bookmark :class="`bookmark-${post.index}`" />
            </div>
        </div>
        <div class="post__caption pl-lr mt-10">
            <div class="post__caption-info">
                <span class="username">{{ post.owner.name.split(" ")[0].toLowerCase() }}</span>&nbsp;<span class="">{{ post.title }}</span>
            </div>
            <div class="post__caption-detail">
                <span>{{ randomNumber(1, 12)}} HOURS AGO</span>
            </div>
            
        </div>
        <div class="post__comments" :id="`overlay-${post._id}`">
            <div class="post__comments-body pl-lr">
               <div class="post__comments-block" v-if="post.comments.length > 0">
               
               
            <span v-if="post.commentsCount > 3 && activeOption" class="view-comment"><nuxt-link :to="`app/post/${this.post._id}`">View all {{ post.commentsCount }} comments</nuxt-link></span>
            <span v-if="post.commentsCount && !activeOption" class="view-comment">{{ post.commentsCount }} comments</span>
            <template v-for="(comment, index) in post.comments">
                <div :key="index" class="user__comment" v-if="index < commentLength">
                    <div class="user__comment-main">                        
                        <div class="user__comment-main--top">
                            <span class="username">{{ comment.user.split(" ")[0].toLowerCase() }}</span> 
                            <span class="content">{{ comment.comment }}</span>
                        </div>
                        <div class="user__comment-main--bottom">
                            <span>{{ randomNumber(1, 23) }}h</span> &nbsp;
                            <span>{{ randomNumber(25, 1500) }} likes</span>&nbsp;
                            <span @click="appendUsername(comment.user)">Reply</span>
                        </div>
                    </div> 
                    <div class="user__comment-buttons">
                        <div v-if="authUser._id == comment.user_id && !activeOption" @click="deleteComment(comment._id, `#overlay-${post._id}`)">
                           <thrash-icon /> 
                        </div>
                        <div @click="likeReply(`#reply-${comment._id}`)">
                          <app-heart :id="`reply-${comment._id}`"/>  
                        </div>
                        
                        </div>
                </div>
               
            </template>
            </div>
            <div class="add-new" @click="addNewComments" v-if="!showAddButton && !activeOption" >
                  <add-new v-if="!fetchingComments" /> 
                  <comment-loader v-else-if="fetchingComments" class="comments-load" />
            </div>
            </div>
           
        <div class="post__comment" v-if="$store.state.token">
            <div class="loader" :id="`loader-${post._id}`"></div>
            <form @submit.prevent="addComment(`#loader-${post._id}`)" autocomplete="off">
                <textarea name="" v-model="newComment" id="" placeholder="Add a comment here..."></textarea> 
                <button :type="newComment.length > 0 ? 'submit' : 'button'" :class="newComment.length > 0? 'opaque':'trans'">Post</button>
            </form>
        </div> 
        </div>
        
    </div>
</no-ssr>
</template>

<script>
import AppComment from '~/components/icons/comment.vue'
import AppShare from '~/components/icons/share.vue'
import AppHeart from '~/components/icons/heart.vue'
import AppBookmark from '~/components/icons/bookmark.vue'
import AddNew from '~/components/icons/add-new.vue'
import ThrashIcon from '~/components/icons/thrash-icon.vue'
import CommentLoader from '~/components/icons/comment-loader.vue'

export default {
        props: {
            post: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        components:{
            AppHeart,
            AppComment,
            AppShare,            
            AppBookmark,
            AddNew,
            ThrashIcon,
            CommentLoader
        },
        computed: {
            isLiked(){
                return this.post.likes.some(el => el.user_id == this.authUser._id) 
            },
            showAddButton(){
                return this.post.comments.length == this.post.commentsCount
            },
            activeOption(){
                return this.$route.fullPath.endsWith("/app")
            },
            commentLength(){
                if(this.activeOption){
                    return 2
                }
                return this.post.comments.length
            },
            isLoggedIn(){
                return this.$store.getters.isUserLoggedIn
            }
        },
        data(){
            return{
                newComment: "",
                authUser: this.$store.state.authUser,
                commentSkip: 3,
                fetchingComments: false,
                textareaHeight: 20
            }
        },
        mounted(){
            // console.log(this.post)
        },
          methods:{
     async likeUI(el, {likes}, $event){
         if(this.isLoggedIn){
            //  console.log(likes)
            const element = document.getElementsByClassName(el)
            
            
            //if he hasn't add
            if(!this.post.isLiked){
                element[1].style.fill = "red"
                // likes.push({user: this.authUser.name, user_id: this.authUser._id})
                //hit the like endpoint
                this.$axios.post(`/gifs/${this.post._id}/like`)
                    .then(resp=>{
                        // console.log(resp.data.data)
                        this.$store.commit("updateLikes", {num: 1, post_id: this.post._id})
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            } 
            if(this.post.isLiked){
                element[1].style.fill = "white"
                this.$store.commit("updateLikes", {num: -1, post_id: this.post._id})
                // hit the unlikelike endpoint
                this.$axios.delete(`/gifs/${this.post._id}/like`)
                    .then(resp=>{
                        // console.log(resp.data.data)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            }
         }
         else{
             this.$router.push("/")
         }
 
    },
    addNewComments(){
        this.fetchingComments = true;
        this.$axios
          .get(`/gifs/${this.$route.params.id}/comment?skip=${this.commentSkip}`)
          .then(resp => {
            // console.log(resp.data);
            this.$store.commit("appendNewComments", {comment: resp.data.data, post_id: this.post.id})
            // this.post.comments = [...this.post.comments, ...resp.data.data]
            // console.log(resp.data.data)
            this.fetchingComments = false;
            this.commentSkip += 3
          })
          .catch(err => {
            console.log(err);
            this.fetchingComments = false;
          });
    },
    setBookmarkText(el){
        const containsClass = el.classList.contains("bookmark");
            if(containsClass){
                return 'Post added to your bookmarks'
            }
            return 'Post removed to your bookmarks'        
    },
    showMessage(el){
        if(this.isLoggedIn){
        const element = document.getElementsByClassName(el)
        
         element[0].classList.toggle("bookmark");
        this.$store.commit("set_actionText", this.setBookmarkText(element[0]))
        this.$store.dispatch("set_copied", true)
        }
        else{
             this.$router.push("/")
        }
    },
    addComment(el){
       const element = document.querySelector(el)
       element.classList.add("anim-loader")
        this.$axios.post(`/gifs/${this.post._id}/comment`, {comment: this.newComment})
        .then(resp=>{
            // console.log(resp.data.data)
            this.newComment = ""
            this.$store.commit("addComment", {comment: resp.data.data.comment, user: resp.data.data.user, user_id: resp.data.data.user_id, _id: resp.data.data._id, post_id: resp.data.data.post })
            // this.post.comments.unshift({comment: resp.data.data.comment, user: resp.data.data.user, user_id: resp.data.data.user_id, _id: resp.data.data._id})
            element.classList.remove("anim-loader")
            // this.$emit('commentAdded', this.post._id)
            // 
        })
        .catch(err=>{
            element.classList.remove("anim-loader")
            console.log(err)
        })
    },
    deleteComment(comment_id, el){
        const element = document.querySelector(el)

       element.style.opacity = ".3"
        this.$axios.delete(`/gifs/${comment_id}/comment`)
                .then(resp=>{
                    element.style.opacity = "1"
                    // console.log("the post is", this.post)
                    this.$store.commit("decrementCommentCount", {comment_id, post_id: this.post.id })
                })
                .catch(err=>{
                    element.style.opacity = "1"
                    console.log(err)
                })
    },
        likeReply(el){
        const element = document.querySelector(el)
        element.classList.toggle("liked");
    },
    appendUsername(name){
       this.newComment = `@${name.split(" ")[0].toLowerCase()}`
    }
  }
}
</script>

<style lang="scss" scoped>
.action-body{
    // padding-left: 10px;
    background-color: #fff;
}
.post{
    &__caption{
        font-size: 15px;
        display: flex;
        flex-direction: column;
        color: #262626;
        
        &-info{
        }
        &-detail{
            font-size: 10px;
            color: #8e8e8e;
        }
    }
    &__image{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: #eee;
        position: relative;
        cursor: pointer;
        margin-right: 15px;
    }
    &__actions{
        display: flex;
        justify-content: space-between;
        &-interact{
            display: flex;
            & > * {
                cursor: pointer;
            }
            :not(:last-child){
                margin-right: 15px;
            }
            svg{
            fill: #000;
            width: 24px;
            height: 24px;
            display: block;
            cursor: pointer;
            overflow: hidden;
            pointer-events: none;
                
        }
        div:first-child svg{
            fill: #fff;
            stroke: #000;
               stroke-width: 25px;
            //    stroke-dasharray: 2,2;
            stroke-linejoin: miter-clip;
            opacity: 1;
        }
        }
        &-bookmark{
                cursor: pointer;
            svg{
                width: 24px;
                height: 24px;
                display: block;
                pointer-events: none;
               fill: #fff; 
               stroke: #000;
               stroke-width: 25px;
            //    stroke-dasharray: 2,2;
            stroke-linejoin: miter-clip;
            opacity: 1;
            }
            
        }
        
    }
    &__comments{
        // border-top: .5px solid #eee;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: #262626;
        &-block{
            .view-comment{
                font-size: 13px;
                color: #8e8e8e;
                & a:hover, a:link{
                    color: #8e8e8e;
                }
            }
            
        }
        .add-new{
            margin: 15px 0;
            width: 100%;
            text-align: center;
          svg{
            width: 24px;
            height: 24px;
            display: inline-block;
            text-align: center;
        }  
        }
        
        button{
            color: #0095f6;
            font-weight: 700;
            font-size: 13px;
        }
    }
    &__comment{
        
        position: relative;
        overflow: hidden;
        
        form{
            display: flex;
            align-items: center;
            justify-content: center;
            // border-top: .5px solid #efefef;
            overflow: hidden;
            height: 61px;
            textarea{
                flex-grow: 1;
                resize: none;
                font-family: 'Mukta';
                padding-left: 15px;
                padding-top: 17px;
                box-sizing: border-box;
                overflow-wrap: break-word;
                word-break: break-all !important;
                text-rendering: auto;
                white-space: pre-wrap !important;
                height: auto !important;
                overflow-y: auto;
                font-size: 15px;
                // border-bottom: .5px solid #efefef;  
                // border-top: .5px solid #efefef; 
                &::-webkit-scrollbar {
                    display: none;
                }           

                &::placeholder{
                    font-size: 15px;
                    transform:translateY(85%);
                    font-family: 'Mukta';
                    line-height: 0;
                    padding: 3px 0;
                }
            }
            button{
                background-color: #fff;
            }
        }
    }
    &__comments-body{
        max-height: 230px;
        overflow-y: auto;
        position: relative;
        border-bottom: .5px solid #efefef;
          &::-webkit-scrollbar {
            display: none;
        }

//         &::after{
//             content: "View all";
//             text-align: center;
//             position: absolute;
//             bottom: 6px;
//             left: 0;
//             height: 20px;
//             width: 100%;
//             font-size: .8em;
//             // background-color: #fafafa;
//             // opacity: .85;
//             display: inline-block;
//             -webkit-box-shadow: inset 0px 14px 0px 0px rgba(242,242,242,1);
// -moz-box-shadow: inset 0px 14px 0px 0px rgba(242,242,242,1);
// box-shadow: inset 0px 14px 0px 0px rgba(242,242,242,1);

//             &:hover{
//                 background-color: #f00;
//             }
//         }
    }
}
.username{
    font-weight: 600;
    display: inline-block;
    cursor: pointer;
    font-size: 15px;
    // margin-right: 5px;
}
.content{
    font-size: 15px;
}
.user__comment{
    // font-size: .9em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 10px;

    &-main{
        display: flex;
        flex-direction: column;
        &:not(:last-child){
        margin-bottom: 10px;
      }
        &--top{
            display: inline-block;
            line-height: 20px;
        }
        &--bottom{
            display: inline-block;
            font-size: 10px;
            font-weight: 600;
            color: #8e8e8e;
            line-height: 20px;

            :not(:first-child){
               cursor: pointer 
            }
            
        }
        
    }
    &-buttons{
        display: flex;

        :not(:last-child){
            margin-right: 5px;
        }
    }

    svg{
        fill: #8e8e8e;
        opacity: .3;
        width: 15px;
        height: 15px;
        cursor: pointer;
    }
}
.opaque{
    opacity: 1;
    cursor: pointer;
}
.trans{
    opacity: .3;
    font-size: 15px;
}
.bookmark{
    fill: #000 !important;
    stroke: none !important;
    stroke-width: 0;
}
.liked{
        fill: red !important;
        opacity: .85 !important;
        stroke: none !important;
 }


.pl-lr{
 padding: 0 15px;  
}
// background: linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.95),#FFF)
</style>