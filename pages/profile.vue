<template>
  <div>{{ user }}</div>
</template>

<script setup lang="ts">
  const { init, user } = useSpotify();
  await init();
</script>

<style scoped></style>
