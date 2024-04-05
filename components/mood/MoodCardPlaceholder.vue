<template>
  <div class="flex gap-4">
    <div
      v-if="empty"
      class="flex w-full flex-col rounded-lg bg-gray-200 py-3 dark:bg-gray-800"
    >
      <p class="text-center text-sm">¡No tienes moods!</p>
    </div>
    <div
      v-else
      v-for="item in [1, 2, 3, 4, 5]"
      :key="item"
      class="flex w-[280px] items-center gap-4 rounded-lg bg-gray-200 p-4 dark:bg-gray-800"
    >
      <USkeleton class="h-[90px] w-[90px] rounded-full dark:bg-gray-900" />
      <div class="flex flex-1 flex-col gap-1">
        <USkeleton class="h-[20px] w-full dark:bg-gray-900" />
        <USkeleton class="h-[20px] w-full dark:bg-gray-900" />
        <USkeleton class="h-[16px] w-full dark:bg-gray-900" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    empty: boolean;
  }>();

  const { empty } = toRefs(props);
</script>

<style scoped></style>
