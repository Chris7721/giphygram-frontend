<template>
    <div class="post">
        <app-user :post="post"/>
        <div class="post__gif">
            <image-card :post="post" />
            <!-- <img :src="post.giphy" alt=""> -->
        </div>
        <app-action :post="post" @commentAdded="increaseCommentCount($event)" @commentDeleted="decreaseCommentCount($event)" />
        
    </div>
</template>

<script>
import AppUser from '~/components/common/post-user.vue'
import AppAction from '~/components/common/post-actions.vue'
import ImageCard from '~/components/common/image-card.vue'


export default {
    components: {
        AppUser,
        AppAction,
        ImageCard
        
    },
    props: {
    post: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data(){
            return{
                // authUser: this.$store.state.authUser
            }
        },
  
  methods:{
     async likeUI(el, {likes}, $event){
         const element = document.getElementsByClassName(el)
         console.log(element)
         element[1].style.fill = "red"
         if(!$event){
            element[0].classList.add('like-anim');
        }       
        await setTimeout(()=>{
            element[0].classList.remove('like-anim');
         },1000)
         const found = likes.some(el => el.user_id == this.authUser._id);
         if(!found){
            likes.push({user: this.authUser.name, user_id: this.authUser._id})
          this.$axios.post(`/gifs/${this.post._id}/like`)
                .then(resp=>{
                    console.log(resp.data.data)
                })
                .catch(err=>{
                    console.log(err)
                })
         } 
    },
    increaseCommentCount($event){
        this.$emit('newComment', $event)        
    },
    decreaseCommentCount($event){
        alert("delee")
        this.$emit('commentDeleted', $event)
    }
  }

    
}
</script>

<style lang="scss" scoped>
.post{
    width: 100%;
    border: 1px solid #efefef;
    margin-bottom: 40px;
    @include respond-before-phone {
                margin-bottom: 0;
                border: none;
                border-bottom: .9px solid #efefef;
            }

    &__gif{
        width: 100%;
        img{
            width: 100%;
            object-fit: cover;
        }
    }
}

</style>