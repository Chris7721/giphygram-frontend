require("dotenv").config();
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/instagram.svg' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Mukta:wght@400;600&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Merienda+One&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  // loading: { color: '#fff', height: '4px' },
  loading: '~/components/common/loading.vue',
  // border-image: linear-gradient(139deg, #fb8817, #ff4b01, #c12127, #e02aff) 3;
  /*
  ** Global CSS
  */
  css: [
    "~/assets/global/grid/flexible-grid.scss",
    "~/assets/global/transition.css",
    "~/assets/global/main.scss"
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "~/plugins/button", mode: "client" },
    { src: "~/plugins/newPost", mode: "client" },
    { src: "~/plugins/axios" },
    { src: "~/plugins/client-init" },
    { src: "~/plugins/globalMixins" },
    { src: "~/plugins/filters" },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    ['cookie-universal-nuxt', { alias: 'cookiz' }]
  ],
  styleResources: {
    scss: ["assets/global/mixins.scss", "assets/global/variables.scss"]
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
 axios: {
  baseURL: process.env.BASE_URL
},
router: {
  middleware: ["auth", "pages"]
},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
