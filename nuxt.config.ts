// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/image',
  ],
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      exclude: ['/about'],
    },
  },
  ui: {
    icons: ['logos', 'streamline', 'mdi', 'material-symbols'],
  },
  googleFonts: {
    families: {
      Poppins: true,
    },
    download: true,
  },
  runtimeConfig: {
    public: {
      supabaseRedirectUrl: '',
      spotifyScopes: '',
    },
  },
});
