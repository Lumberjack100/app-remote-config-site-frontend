// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon',
  ],

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/main.css',
  ],

  app: {
    head: {
      title: 'Android应用远程配置管理系统',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Android应用远程配置管理系统' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    // 服务器端环境变量
    apiSecret: process.env.API_SECRET,
    // 客户端环境变量
    public: {
      apiBase: process.env.API_BASE_URL,
    }
  },

  colorMode: {
    preference: 'light'
  },

  compatibilityDate: '2025-04-17'
})