<template>
    <div class="header__top">
        <div @click="showUploadModal" v-if="isUserLoggedIn" class="camera">
           <app-camera /> 
        </div>
        <div class="header__logo">
            <nuxt-link to="/app">
                <h2>Giphygram&#x1F4F8;</h2>
            </nuxt-link>
            
        </div>
        <div class="header__search" v-if="isUserLoggedIn">
            <nuxt-link to="/app/explore">
                <input type="text" class="header__input" placeholder="Search for a user here">
            </nuxt-link>
            
        </div>
        
        <div class="header__options" v-if="isUserLoggedIn">
            <!-- <color-mode-picker /> -->
            <div class="svg">
                <nuxt-link to="/app">
              <home-icon />  
                </nuxt-link>
            </div>
            <div class="svg">
                <color-mode-picker />
            </div>
            <div class="svg" @click="$router.push('/app/inbox')">
              <app-share />   
            </div>
            <div class="svg">
                <nuxt-link to="/app/notifications">
              <app-heart /> 
                </nuxt-link> 
            </div>                      
            
            <div class="header__menu" @click="showOption = showOption == true ? false : true" :class="showOption ? 'selected' : ''">
                <transition name="fade">
                <div v-if="showOption" class="header__menu-options" @click="logout">
                    <h2>Logout {{ $store.state.authUser.name.split(" ")[0] }} &#x1F91D;</h2>
                </div>
                </transition>

            </div>
        </div>
    </div>
</template>


<script>
import HomeIcon from '~/components/icons/home-icon.vue'
import AppShare from '~/components/icons/share.vue'
import AppCamera from '~/components/icons/camera.vue'
import AppHeart from '~/components/icons/heart-fill.vue'
import ColorModePicker from '~/components/common/color-mode-picker.vue'
export default {
    components:{
        HomeIcon,
        AppHeart,
        AppShare,
        AppCamera,
        ColorModePicker
    },
    data(){
        return{
         showOption: false   
        }        
    },
    computed: {
        //use watch to change the dynamic header text
        isUserLoggedIn(){
            return this.$store.getters.isUserLoggedIn
        }
    },
    methods: {
        logout(){
            this.$store.dispatch("logout")
        }
    }
}
</script>

<style lang="scss" scoped>
 
.header{
    &__menu{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #eee;
        position: relative;
        cursor: pointer;
        background-image: url('/profile-image.jpg');
        background-size: cover;
        &.selected{
            border: 1px solid var(--icons-fill);;
        }
        &-options{
            position: absolute;
            text-align: center;
            z-index: 999;
            width: 150px;
            top: 34px;
            right: -55px;
            color: var(--font-color-secondary);
            background-color: var(--bg);
            border: 1px solid var(--border-color);
            border-radius: 3px;
            padding: 6.5px;
            &:hover{
                color: orangered;
            }
        }
        @include respond-before-phone {
            display: none;
        }

        &::before{
            content: "";
            display: block;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            border: 1.6px solid #fff;
            background-color: rgb(44, 231, 6);
            position: absolute;
            bottom: 0;
            right: -1.5px;

        }
    }

    &__search{
        height: 28px;
        min-width: 125px;
        width: 250px;
        position: relative;

        @include respond-before-phone {
        display: none;
      }
    }

    &__input{
        height: 100%;
        width: 100%;
        padding: 11px 10px;
        font-size: 13px;
        padding: 3px 10px 3px 26px;
        border-radius: 3px;
        &::placeholder{
            text-align: center;
            color: #dbdbdb;
        }
    }

    &__options{
        display: flex;
        align-items: center;
        & > *{
            cursor: pointer;
        }
        :not(:last-child){
                margin-right: 12px;
                // @include respond-before-phone {
                //         margin-right: 0;
                // }
            }
            .svg{
                width: 24px;
                height: 24px;
                // background-color: #f00;
               svg{
                width: 100%;
                height: 100%;
                fill: var(--icons-fill);
                // background-color: #f00;
                z-index: 444;
                // display: block;
            }  
            }
            .svg:nth-child(3){
                @include respond-before-phone {
                        margin-right: 0;
                }
            }
            .svg:nth-child(1), .svg:nth-child(4){
                        @include respond-before-phone {
                        display: none;
                        
                        }
            }
            // .svg{
            //     display: none;
            // }   
            
    }
    .camera{
                width: 24px;
                height: 24px;
                cursor: pointer;
                display: none;
                fill:  var(--icons-fill);
                @include respond-before-phone {
                    display: block;
                }
            }
}
</style>