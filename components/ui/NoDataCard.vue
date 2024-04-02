<template>
  <div class="w-full rounded-lg border p-4 dark:border-gray-800">
    <p class="text-sm text-gray-500">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    label: string;
  }>();

  const { label } = toRefs(props);
</script>

<style scoped></style>
