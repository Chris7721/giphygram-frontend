<template>
    <header class="header">
        <app-camera class="camera" v-if="isUserLoggedIn" />
        <div class="header__logo">
            <nuxt-link to="/app">
                <h2>Giphygram&#x1F4F8;</h2>
            </nuxt-link>
            
        </div>
        <div class="header__search" v-if="isUserLoggedIn">
            <nuxt-link to="/app/search">
                <input type="text" class="header__input" placeholder="Search for a user here">
            </nuxt-link>
            
        </div>
        <div class="header__options" v-if="isUserLoggedIn">
            <div class="svg">
              <home-icon />  
            </div>
            <div class="svg">
              <app-share />   
            </div>
            <div class="svg">
              <compass-icon />  
            </div>                      
            
            <div class="header__menu" @click="showOption = showOption == true ? false : true" :class="showOption ? 'selected' : ''">
                <transition name="fade">
                <div v-if="showOption" class="header__menu-options" @click="logout">
                    <h2>Logout {{ $store.state.authUser.name.split(" ")[0] }}</h2>
                </div>
                </transition>

            </div>
        </div>
    </header>
</template>

<script>
import HomeIcon from '~/components/icons/home-icon.vue'
import AppShare from '~/components/icons/share.vue'
import AppCamera from '~/components/icons/camera.vue'
import CompassIcon from '~/components/icons/compass.vue'
import HeaderActions from '~/components/common/header-actions.vue'
export default {
    components:{
        HomeIcon,
        CompassIcon,
        AppShare,
        AppCamera,
        HeaderActions
    },
    data(){
        return{
         showOption: false   
        }        
    },
    computed: {
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
    min-height: 80px;
    padding: 0 80px;
    background-color: #fff;
    box-shadow: 0 1px 1px 0 rgba($color-primary,.5);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    @include respond-before-phone {
        margin-bottom: 0;
        padding: 0 15.5px;
        min-height: 45px;
        border-bottom: 1px solid #fafafa;
      }
      

    &__menu{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #eee;
        position: relative;
        cursor: pointer;
        background-image: url('/profile-pic.jpeg');
        background-size: cover;
        &.selected{
            border: 1px solid #000;
        }
        &-options{
            position: absolute;
            text-align: center;
            z-index: 999;
            width: 150px;
            top: 34px;
            right: -55px;
            background-color: #fff;
            border: 1px solid #dbdbdb;
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
        background: #fafafa;
        font-size: 13px;
        padding: 3px 10px 3px 26px;
        border-radius: 3px;
        border: 1px solid #dbdbdb;
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
            }
            .svg{
                width: 24px;
                height: 24px;
                // background-color: #f00;
               svg{
                width: 100%;
                height: 100%;
                fill: #000;
                // background-color: #f00;
                z-index: 444;
                // display: block;
            }  
            }
            
            .svg:nth-child(1), .svg:nth-child(3){
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
                @include respond-before-phone {
                    display: block;
                }
            }
}
</style>