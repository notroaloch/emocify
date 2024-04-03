<template>
  <div
    class="flex h-[calc(100vh-60px)] flex-col items-center justify-center gap-20"
  >
    <div class="flex flex-col items-center gap-12">
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
