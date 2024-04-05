<!-- TODO: BETTER NO DATA AND CREATE NEW MOOD LINK -->
<template>
  <div class="mb-24 mt-2">
    <p class="text-2xl font-bold tracking-tight">Moods</p>
    <MoodTable :is-loading="isLoading" class="mt-4" />
  </div>
</template>

<script setup lang="ts">
  const { moods, getMoods } = useMood();
  const isLoading = useState('moods-isLoading', () => false);

  // FETCH INITIAL DATA
  callOnce('index-callOnce', async () => {
    isLoading.value = true;
    if (!moods.value) {
      await getMoods();
    }
    isLoading.value = false;
  });
</script>

<style scoped></style>
