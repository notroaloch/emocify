<template>
  <div>
    <h1>LOGIN PAGE</h1>
    <button @click="signInWithSpotify">Spotify</button>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'auth',
  });

  const supabase = useSupabaseClient();

  const signInWithSpotify = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'spotify',
      options: {
        redirectTo: '/auth/confirm',
        scopes: SPOTIFY_SCOPES,
      },
    });
  };
</script>

<style scoped></style>
