<template>
  <div class="mb-24 mt-2">
    <p class="text-2xl font-bold tracking-tight">Detalles de Mood</p>
    <p>{{ currentMood }}</p>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const moodID = route.params.id;

  const { currentMood, getMood } = useMood();
  const { pending: isLoading } = useAsyncData('mood/id/getMood', async () => {
    return await getMood(moodID as string);
  });
</script>

<style scoped></style>
