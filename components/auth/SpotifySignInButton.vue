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
  const { signInWithSpotify } = useAuth();
</script>

<style scoped></style>
