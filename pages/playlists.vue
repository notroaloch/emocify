<template>
  <div>{{ playlists }}</div>
</template>

<script setup lang="ts">
  const { playlists } = useSpotify();
</script>

<style scoped></style>
