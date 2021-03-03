<template>
  <div class="onload modal">
    <instagram-icon />
  </div>
</template>

<script>
import InstagramIcon from '~/components/icons/instagram-icon.vue'

export default {
  components: {
    InstagramIcon
  }
}
</script>

<style lang="scss" scoped>
.onload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  opacity: 1;
  width: 100% !important;

  svg {
    width: 52px;
    height: 52px;
    fill: #b1b1b1;
    @include respond-before-phone {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
