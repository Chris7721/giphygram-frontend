<template>
  <div class="info-loader">
    <content-loader preserveAspectRatio="none" primaryColor="var(--loader-primary)" secondaryColor="var(--loader-secondary)" :speed="1" :height="100" :width="400">
      <!-- <rect x="10" rx="4" ry="4" r="24" width="25" height="25" /> -->
      <rect y="7" rx="0" ry="0" width="150" height="5" />
      <rect y="18" rx="0" ry="0" width="190" height="4" />
      <rect x="375" y="10" rx="4" ry="4" r="24" width="25" height="25" />
      <!-- <rect x="378" y="10" rx="100" ry="100" width="12" height="12" /> -->
    </content-loader>
  </div>
</template>

<script>
import {ContentLoader} from 'vue-content-loader'
export default {
  components: {
    ContentLoader
  }
}
</script>
