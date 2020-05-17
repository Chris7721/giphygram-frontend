<template>
    <div class="post__details">
        <option-modal ref="optionModal" />
            <div class="post__details-block">
                <!-- <div class="img"> -->
                    <!-- <img v-if="post.image" :src="post.image" alt=""> -->
                    <div class="post__image">
                        <!-- <div class="status"></div> -->
                    </div>
                <!-- </div> -->
                <div class="post__user">
                    <div class="post__user-details">
                       <h3>
                            {{ post.owner.name.toLowerCase() }}
                        </h3> 
                        <img src="/verified.png" alt="verified-user" v-if="randomNumber(1, 3) % 2 !== 0">
                    </div>
                
                <small>
                    Somewhere in the world
                </small>
            </div>
            </div>
            <div @click="showModal()">
               <app-menu />
            </div>
        </div>
</template>

<script>
import AppMenu from '~/components/icons/menu.vue'
import OptionModal from '~/components/common/option-modal.vue'
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
            AppMenu,
            OptionModal
        },
        data(){
            return{
                
            }
        },
        mounted(){
            // console.log(this.post)
        },
        methods:{
            showModal(){
                this.$refs["optionModal"].openModal(this.post);
            }
        }
}
</script>

<style lang="scss" scoped>
.post{
        &__details{
            background-color: #fff;
            // position: relative;
        padding: 16px;
        display: flex;
        border: .5px solid #eee ;
        display: flex;
        align-items: center;
        justify-content: space-between;
        @include respond-before-phone {
            border-top: none;
            background-color: #fafafa;
      }
      @include respond-phone {
            background-color: #fff;
      }
        &-block{
            display: flex;
            align-items: center;
            .img{
                // position: relative;
            }

            .post__user{
                display: flex;
                flex-direction: column;
                margin-left: 15px;
                &-details{
                    margin-bottom: 7px;
                    display: flex;
                    align-items: center;
                    img{
                        width: 15px;
                        height: 15px;
                        display: block;
                        margin-left: 3.5px;
                    }
                }
                h3, small{
                    line-height: 9px;
                    display: block; 
                    font-size: 15px;
                }
                h3{
                    
                    font-weight: 600;
                }
            }
        }
        svg{
            cursor: pointer;
        }
    }
    &__image{
        width: 37px;
        height: 37px;
        border-radius: 50%;
        background: linear-gradient(139deg, #fb8817, #ff4b01, #c12127, #e02aff);
        // display: none;
        position: relative;
        cursor: pointer;
        // z-index: 111;
        display: flex;
        align-items: center;
        // &:nth-child(2n+1){
        //     background: #0f0;
        // }

        &::after{
            content: " ";
            display: block;
            width: 25px;
        height: 25px;
        background-color: #eee;
        border: 3px solid white;
        // background-color: #f00 !important;
        
        border-radius: 50%;
        // border: 2px solid red;
        position: absolute;
        top: 52%;
  left: 52%;
  transform: translate(-52%, -52%);
//   margin-left: -5px;
        // z-index: -111;

        }
        
    }
}
.modal-menu{
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: #eee;
    z-index: 9999;
}

</style>