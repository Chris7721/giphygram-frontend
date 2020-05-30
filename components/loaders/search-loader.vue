<script>
import { ContentLoader } from "vue-content-loader";
export default {
  components: {
    ContentLoader
  }
};
</script>

  <template>
  <div style="height: 80px; display: block; width: 100%; height: 100%">
    <content-loader
      preserveAspectRatio="none"
      primaryColor="#dbdbdb"
      secondaryColor="#A9A9A9"
      :speed="1"
      :height="700"
      :width="700"
    >
      <rect rx="4" ry="4" r="24" width="800" height="490" />
      <!-- <rect x="105" y="" rx="4" ry="4" r="24" width="100" height="80" /> -->
    </content-loader>
  </div>
</template>

<style lang="scss" scoped>
svg{
    height: 300px
}
</style>