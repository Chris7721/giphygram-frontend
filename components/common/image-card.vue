<template>
    <div class="post_image" @dblclick="likeUI(`interact-${post._id}`, post)">
        <app-heart :class="`interact-${post._id}`" />
        <img :src="post.giphy" alt="">
    </div>
</template>

<script>
import AppHeart from '~/components/icons/heart.vue'
export default {
    props:{
      post: {
      type: Object,
      default() {
        return {};
      }
    }
  },  
  components:{
      AppHeart,
  },
    data(){
            return{
                authUser: this.$store.state.authUser
            }
        },
        computed: {
            isLoggedIn(){
                return this.$store.getters.isUserLoggedIn
            },
            isLiked(){
                return this.post.likes.some(el => el.user_id == this.authUser._id) 
            },
        },
        mounted(){
            // document.addEventListener('contextmenu', event => event.preventDefault());
        },
      methods:{
     async likeUI(el, {likes}, $event){
         if(this.isLoggedIn){
                     const likeDetails = {user: this.authUser.name, user_id: this.authUser._id}
         console.log("Like method clicked")
         console.log(this.post)
        //  
         const element = document.getElementsByClassName(el)
         console.log(element)
         if(!$event){
            element[0].classList.add('like-anim');
            await setTimeout(()=>{
            element[0].classList.remove('like-anim');
         },1000)
         if(this.isLiked){
             return
         }
        }       
                 
         //if he hasn't add
         if(!this.isLiked){
             console.log("not liked before")
             element[1].style.fill = "red"
             this.$store.commit("updateLikes", {num: 1, post_id: this.post._id})
            this.$axios.post(`/gifs/${this.post._id}/like`)
                .then(resp=>{
                    // this.$store.commit("updateLikes", {num: 1, post_id: this.post._id})
                    // console.log(resp.data.data)
                    // console.log("New Like added")
                })
                .catch(err=>{
                    console.log(err)
                })
         } 
         else if(this.isLiked){
             console.log("have been liked before")
             element[1].style.fill = "white"
             this.$store.commit("updateLikes", {num: -1, post_id: this.post._id})
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
  }
    }
    
</script>

<style lang="scss" scoped>
.post_image{
    width: 100%;
            height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        svg{
            position: absolute;
            width: 90px;
            height: 90px;
            @include respond-tablet {
                width: 65px;
                height: 65px;
            }
            @include respond-before-phone {
                width: 65px;
                height: 65px;
            }
            display: block;
            fill: rgba(#fff, .85);
            transform: scale(0);
            
           
        }
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

}

.like-anim{
     animation: like-animation 1s ease-in-out forwards;
}
@keyframes like-animation {
    0%, 100% {
        opacity: 0;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    15% {
        opacity: .9;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
    30% {
        -webkit-transform: scale(.95);
        transform: scale(.95);
    }
    45%, 80% {
        opacity: .9;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    
}
    
</style>