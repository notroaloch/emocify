<template>
  <div class="flex gap-4">
    <div
      v-if="empty"
      class="flex w-full flex-col rounded-lg bg-gray-200 py-3 dark:bg-gray-800"
    >
      <p class="text-center text-sm">¡No tienes artistas!</p>
    </div>
    <div
      v-else
      v-for="item in [1, 2, 3, 4, 5]"
      :key="item"
      class="h-[341px] w-[200px]"
    >
      <div class="flex flex-col gap-6">
        <USkeleton class="h-[200px] w-full bg-gray-200" />
        <div class="flex flex-col gap-1">
          <USkeleton class="h-[20px] w-full bg-gray-200" />
          <USkeleton class="mt-1 h-[20px] w-full bg-gray-200" />
        </div>
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
