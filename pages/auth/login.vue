<template>
  <div
    class="h-[calc(100vh-60px)] flex flex-col justify-center items-center gap-20"
  >
    <div class="flex flex-col gap-12">
      <AuthHero />
      <AuthSpotifySignInButton />
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'auth',
  });
</script>

<style scoped></style>
