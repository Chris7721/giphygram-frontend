<template>
    <div class="modal np" v-if="modalOpen">
        <div class="modal__body">
            <div class="loader" id="newPostLoader"></div>
            <div class="form_overlay"></div>
            <div class="modal_options mb-20">
                <div class="header__logo">
                    <nuxt-link to="/app">
                        <h2>Giphygram&#x1F4F8;</h2>
                    </nuxt-link>
                    
                </div>
                <div class="modal_options-right">
                    <h2>New Post</h2>
                    <div class="close_modal" @click="closeModal">
                        <close-icon />
                    </div>
                    
                </div>
            </div>
            <div>
                <form @submit.prevent="uploadFile" autocomplete="off">
                    <div class="upload form-group mb-20">
                        <div
                        class="upload_content"
                        @click="selectDocument('artUpload')"
                        name="art-upload"
                        >
                        <div class="box">
                            <img id="art-upload" src="/fileupload.png" />
                            <h2 class="">Add a gif or image here</h2>
                        </div>
                            
                        </div>
                        <input
                        @change="loadFile"
                        id="artUpload"
                        type="file"
                        name="art-upload"
                        />
                </div>
                    <textarea name="" id="" placeholder="How's your day going? 😎" class="mb-20" v-model="uploadDetails.title"></textarea>
                    <social-button :loading="uploading" :disabled="validated">Create Post! &#x1F600;</social-button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import UploadIcon from '~/components/icons/upload-icon.vue'
import CloseIcon from '~/components/icons/close-icon.vue'
export default {
    components:{
        UploadIcon,
        CloseIcon
    },
    data(){
        return{
            modalOpen: false,
            uploading: false,
            post: {},
            uploadDetails: {
                title: "",
                file: false
            }
        }
    },
    computed: {
        validated(){
  		if(this.uploadDetails.file && this.uploadDetails.title.length > 0){
  			return false;
  		}
  		return true;
  	}
    },
    methods: {
        openModal(post){
            this.post = post
            this.modalOpen = true
        },
        closeModal(){
            this.modalOpen = false
        },
        loadFile(payload) {
            var output = document.getElementById("art-upload");
            var file = payload[0] || payload.target.files[0];
            if (!file) {
                return;
            } else if (!file.type.match("image.*")) {
                alert("Select an image");
                return;
            }
            this.uploadDetails.file = file;
            output.src = URL.createObjectURL(file);
            console.log(this.uploadDetails)
    },
    uploadFile(){
        const element = document.querySelector('#newPostLoader')
        const overlay = document.querySelector('.form_overlay')
        overlay.style.display = "block"
       element.classList.add("anim-loader")
       this.uploading = true;
        let formData = new FormData();
        formData.append("title", this.uploadDetails.title);
        formData.append("gif_post", this.uploadDetails.file);

       this.$store.dispatch("uploadPost", formData)
       .then(resp => {
           element.classList.remove("anim-loader")
           overlay.style.display = "none"
           console.log(resp)
           this.uploading = false;
           this.closeModal()
       })
       .catch(err => {
           element.classList.remove("anim-loader")
           overlay.style.display = "none"
           console.log(err)
           this.uploading = false;
           this.closeModal()
       })
    }
        
    }
}
</script>

<style lang="scss" scoped>
    .modal {
  &_options{
      display: flex;
      justify-content: space-between;

      &-right{
          display: flex;
          h2{
              font-weight: 600;
              font-size: 1.2em;
              margin-right: 10px;
          }
          svg{
              width: 24px;
              height: 24px;
              background-color: #fafafa;
              border-radius: 40px;
              cursor: pointer;
            //   padding: 10px;
            &:hover{
                transform: scale(1.15);
            }
          }
      }
  }

  &__body{
      background-color: #fff;
      padding: 20px;
      max-width: 400px;
      margin: 2em auto 3em;
      max-height: calc(100% - 40px);
    //   margin: 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: modalAnim .1s ease-out forwards;
      position: relative;
        @include respond-before-phone {
            margin: .1em auto 3em;
        }
  }

    }
    .upload{
        width:100%;
        height: 100%;
        
        // display: flex;
        // justify-content: center;
        &_content{
            border-radius: 3px;
            display: flex;
            justify-content: center;
            width:100%;
            background-color: #fafafa;
            box-shadow: 0px 2px 19px rgba(69, 64, 70, 0.3);

            padding: 25px 0;

            & .box{
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            img{
            width:100px;
            height: 100px;
            object-fit: cover;
            margin-bottom: 5px;
            // margin: auto 0;
        }
        }
        

        input{
            display: none;
        }
    }
    textarea{
        background-color: #fafafa;
        height: 73px;
        width: 100%;
        border-radius: 3px;
        resize: none;
        font-family: 'Mukta';
        padding: 25px;
        box-shadow: 0px 2px 19px rgba(69, 64, 70, 0.3);


        &::placeholder{
            // padding-left: 25px;
            font-family: 'Mukta';
        }
    }

</style>