<template>
  <UButton
    class="w-fit"
    icon="i-logos-spotify-icon"
    size="lg"
    color="black"
    variant="ghost"
    label="Iniciar Sesión con Spotify"
    @click="signInWithSpotify"
  />
</template>

<script setup lang="ts">
  const runtimeConfig = useRuntimeConfig();
  const supabase = useSupabaseClient();

  const signInWithSpotify = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'spotify',
      options: {
        redirectTo: runtimeConfig.public.supabaseRedirectUrl,
        scopes: runtimeConfig.public.spotifyScopes,
      },
    });
  };
</script>

<style scoped></style>
