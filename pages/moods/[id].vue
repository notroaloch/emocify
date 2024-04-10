<template>
  <div class="mb-24 mt-2">
    <div class="flex items-center gap-2">
      <UButton
        icon="i-material-symbols-arrow-back-ios-new-rounded"
        color="white"
        class="transition-transform hover:scale-125"
        variant="link"
        to="/moods"
      />
      <p class="text-2xl font-bold tracking-tight">Detalles de Mood</p>
    </div>
    <div class="mt-4">
      <MoodDetails :mood="currentMood!" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const id = route.params.id;

  const { currentMood, getMood } = useMood();
  await getMood(id as string);
</script>

<style scoped></style>
