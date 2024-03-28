// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/google-fonts', '@nuxtjs/supabase'],
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      exclude: ['/about'],
    },
  },
  ui: {
    icons: ['logos', 'streamline'],
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
