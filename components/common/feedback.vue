<template>
  <div class="feedback">
    <slot name="feedback">Action Performed</slot>
  </div>
</template>

<style lang="scss" scoped>
.feedback {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: #181818;
  display: flex;
  align-items: center;
  padding: 0 15px;
  z-index: 999;

  p {
    color: white;
    text-align: left;
    font-size: 0.85em;
    // display: inline-block;
  }
}
</style>
