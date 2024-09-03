// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  dayjs: {
    plugins: ['relativeTime', 'utc', 'timezone'],
    locales: ['es'],
    defaultLocale: 'es',
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    'dayjs-nuxt',
    '@nuxt/fonts',
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
  compatibilityDate: '2024-09-03',
});
