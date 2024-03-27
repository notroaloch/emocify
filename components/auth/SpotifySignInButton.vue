<template>
  <div></div>
</template>

<script setup lang="ts">
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
