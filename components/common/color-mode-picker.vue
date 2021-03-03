<template>
  <div class="color__picker">
    <!-- <component :is="`icon-${color}`"  :class="getClasses(color)"/> -->
    <transition-group name="modechange" mode="in-out">
      <div v-if="$colorMode.preference == 'dark'" :key="1" class="mode" @click="$colorMode.preference = 'light'">
        <icon-light />
      </div>
      <div v-if="$colorMode.preference == 'light' || $colorMode.preference == 'system'" :key="2" class="mode" @click="$colorMode.preference = 'dark'">
        <icon-dark />
      </div>
    </transition-group>
  </div>
</template>

<script>
import IconLight from '~/components/icons/light-mode.vue'
import IconDark from '~/components/icons/dark-mode.vue'
export default {
  components: {
    IconLight,
    IconDark
  },
  computed: {
    colorMode() {
      return this.$colorMode.preference
    }
  },
  methods: {
    updateColorMode() {
      this.$colorMode.preference == 'light-mode' ? 'dark-mode' : 'light-mode'
    },
    getClasses(color) {
      // Does not set classes on ssr when preference is system (because we don't know the preference until client-side)
      if (this.$colorMode.unknown) {
        return {}
      }
      return {
        preferred: color === this.$colorMode.preference,
        selected: color === this.$colorMode.value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.color__picker {
  .mode {
    display: flex;
    justify-content: center;
    // width: 40px;
    svg {
      fill: var(--icons-fill) !important;
      width: 26px;
      height: 26px;
      stroke: var(--icon-stroke);
    }
  }
}
</style>
