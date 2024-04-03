<template>
  <UButton
    class="w-fit"
    icon="i-logos-spotify-icon"
    size="xl"
    color="primary"
    variant="link"
    label="Iniciar Sesión con Spotify"
    :disabled="isLoading"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
  const { signInWithSpotify } = useAuth();
  const isLoading = useState('signInButtonLoading', () => false);

  const handleClick = async () => {
    isLoading.value = true;
    await signInWithSpotify();
  };
</script>

<style scoped></style>
