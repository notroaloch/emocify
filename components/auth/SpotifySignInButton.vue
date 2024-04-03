<template>
  <UButton
    class="w-fit"
    icon="i-logos-spotify-icon"
    size="xl"
    color="black"
    variant="solid"
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
    const result = await signInWithSpotify();
  };
</script>

<style scoped></style>
