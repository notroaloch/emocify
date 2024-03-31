<template>
  <div>{{ playlists }}</div>
</template>

<script setup lang="ts">
  const { init, playlists } = useSpotify();
  await init();
</script>

<style scoped></style>
