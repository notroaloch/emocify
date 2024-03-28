<template>
  <div
    class="group flex w-[280px] cursor-grab items-center gap-4 rounded-lg border-t p-4 shadow-sm dark:border-gray-800 hover:dark:shadow-gray-800"
  >
    <NuxtImg
      src="/images/moods/happiness.png"
      class="w-[90px] rounded-full shadow-md transition-all group-hover:scale-105 group-hover:shadow-lg group-hover:dark:shadow-gray-800"
    />
    <div class="flex-1 transition-transform group-hover:translate-x-1">
      <div class="flex cursor-pointer items-center">
        <NuxtLink
          class="group-hover:text-primary line-clamp-1 font-semibold tracking-tight"
          >FELICIDAD</NuxtLink
        >
        <UIcon
          name="i-material-symbols-arrow-outward-rounded"
          class="group-hover:text-primary h-[15px] w-[15px]"
        />
      </div>
      <p class="line-clamp-1 font-extralight tracking-tighter">12316816ASDAS</p>
      <p
        class="line-clamp-1 text-sm font-extralight tracking-tight text-gray-500"
      >
        Creado hace 3 días
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    mood: any;
  }>();

  const { mood } = toRefs(props);
</script>

<style scoped></style>
