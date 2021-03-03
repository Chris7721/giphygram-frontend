<template>
  <div class="button-container">
    <!-- <button v-if="loading" class="button br white m_r_l_auto auth_button_loading norm" type="button">
      <div class="m-auto">
        Uploading Post
      </div>
    </button> -->
    <button v-if="loading" class="button norm form-login auth_button_loading" type="button">
      <slot></slot>
    </button>

    <button v-else :type="disabled ? 'button' : 'submit'" :class="disabled ? 'button' : 'submit'" class="button norm form-login auth_button">
      <slot></slot>
    </button>
    <!-- <button
      v-else
      :type="disabled? 'button':'submit'"
      class="button br white m_r_l_auto auth_button norm"
      :class="disabled? 'button':'submit'"
    >
      <slot></slot> &#x1F600;
    </button> -->
  </div>
</template>
<script>
import LoaderIcon from '~/components/icons/loader.vue'
export default {
  props: {
    loading: {
      type: Boolean,
      default() {
        return false
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  components: {
    LoaderIcon
  }
}
</script>
<style lang="scss" scoped>
.button-container {
  width: 100%;
}
.m-auto {
  display: inline-flex;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
    fill: #fafafa;
    margin-left: 5px;
    animation: rotateElement 2s linear infinite;
  }
}
.auth_button_loading {
  cursor: default;
  &.button {
    opacity: 0.6;
  }
  &.submit {
    opacity: 1;
  }
}
.auth_button {
  &.button {
    opacity: 0.3;
    cursor: default;
  }
  &.submit {
    opacity: 1;
  }
}
</style>
