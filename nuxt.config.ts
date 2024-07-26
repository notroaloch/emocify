// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  dayjs: {
    plugins: ['relativeTime', 'utc', 'timezone'],
    locales: ['es'],
    defaultLocale: 'es',
  },
  devtools: { enabled: true },
  googleFonts: {
    families: {
      Poppins: true,
    },
    download: true,
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    'dayjs-nuxt',
  ],
  runtimeConfig: {
    public: {
      svmModelUrl: '',
      supabaseRedirectUrl: '',
      spotifyScopes: '',
    },
  },
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      exclude: ['/about'],
    },
  },
  ui: {
    icons: [
      'logos',
      'streamline',
      'mdi',
      'material-symbols',
      'line-md',
      'circle-flags',
    ],
  },
});
