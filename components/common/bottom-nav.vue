<template>
    <div class="bottom-nav" v-if="isUserLoggedIn">
        <div @click="backtoTop()">
        <nuxt-link to="/app">
            <home-icon />
        </nuxt-link> 
        </div>
        <div>
           <nuxt-link to="/app/explore">
                <search-icon />
            </nuxt-link> 
        </div>
       
       <div @click="showUploadModal">
          <add-new /> 
       </div>
        <div>
            <nuxt-link to="/app/notifications">
           <app-heart class="heart" /> 
            </nuxt-link>
        </div>
        
       
       <div class="profile" @click="showOption = showOption == true ? false : true" :class="showOption ? 'selected' : ''">
           <transition name="fade">
                <div v-if="showOption" class="profile-options" @click="logout">
                    <h2>Logout  {{ $store.state.authUser.name.split(" ")[0] }} &#x1F91D;</h2>
                </div>
            </transition>
       </div>
    </div>
</template>



<script>
import HomeIcon from '~/components/icons/home-icon.vue'
import AppHeart from '~/components/icons/heart.vue'
import SearchIcon from '~/components/icons/search-icon.vue'
import AddNew from '~/components/icons/add-new.vue'
export default {
    components:{
        AppHeart,
        SearchIcon,
        HomeIcon,
        AddNew
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
.bottom-nav{
    padding: 0 15px;
    height: 55px;
    width: 100%;
    background-color: var(--nav-bg);
    transition: background-color  var(--transition-time);
    position: fixed;
    bottom: 0;
    left: 0;
    display: none;
    align-items: center;
    justify-content: space-between;

    & > *{
        cursor: pointer;
    }

    svg{
        width: 24px;
        height: 24px;
        fill: var(--icons-fill);
    }
    @include respond-before-phone {
                display: flex;
            }
}

    .profile{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #eee;
        position: relative;
        cursor: pointer;
        background-image: url('/profile-image.jpg');
        background-size: cover;

        &.selected{
            border: 1px solid var(--icons-fill);
        }

        &-options{
            position: absolute;
            text-align: center;
            z-index: 999;
            width: 150px;
            bottom: 34px;
            right: -9px;
            background-color: var(--nav-bg);
            border: 1px solid var(--border-color);
            border-radius: 3px;
            padding: 6.5px;
            color: var(--font-color-secondary);
            &:hover{
                color: orangered;
            }
        }
    }
    .heart{
        fill: var(--heart-fill) !important;
            stroke: var(--heart-stroke);
               stroke-width: 40px;
            stroke-linejoin: miter-clip;
    }
</style>