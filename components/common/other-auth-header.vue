<template>
  <div class="header__top">
    <div class="header__left" @click="$router.push('/app')">
      <slot name="left"></slot>
    </div>
    <div class="header__center" style="font-weight: 600">
      <slot name="center"></slot>
    </div>
    <div class="header__right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (document.querySelector('.oppo')) {
      document.querySelector('.oppo').style.width = '50%'
    }

    // classList.add("comments-load")
  }
}
</script>
<style lang="scss" scoped>
.header {
  &__left {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__left,
  &__right,
  &__center {
    cursor: pointer;
    svg {
      width: 22px;
      height: 22px;
      fill: var(--icons-fill);
    }
  }
  &__center {
    text-align: center;
    flex-grow: 1;
    align-content: center;
    color: var(--font-color-primary);
  }
}
</style>
