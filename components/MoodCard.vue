<template>
  <div
    class="group flex w-[280px] cursor-grab items-center gap-4 rounded-lg border-t p-4 shadow-sm dark:border-gray-800 hover:dark:shadow-gray-800"
  >
    <NuxtImg
      :src="imageURL"
      class="w-[90px] rounded-full shadow-md transition-all group-hover:scale-105 group-hover:shadow-lg group-hover:dark:shadow-gray-800"
    />
    <div class="flex-1 transition-transform group-hover:translate-x-1">
      <div class="flex cursor-pointer items-center">
        <NuxtLink
          :to="`/moods/${mood.id}`"
          class="group-hover:text-primary line-clamp-1 font-semibold tracking-tight"
          >{{ mood.emotion }}</NuxtLink
        >
        <UIcon
          name="i-material-symbols-arrow-outward-rounded"
          class="group-hover:text-primary h-[15px] w-[15px]"
        />
      </div>
      <p class="line-clamp-1 font-extralight tracking-tighter">{{ mood.id }}</p>
      <p
        class="line-clamp-1 text-sm font-extralight tracking-tight text-gray-500"
      >
        {{ mood.createdAt }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    mood: Mood;
  }>();

  const { mood } = toRefs(props);

  const imageURL = computed(() => {
    let url;

    switch (mood.value.emotion.toUpperCase()) {
      case 'ANGRINESS':
        url = '/images/moods/angriness.png';
        break;
      case 'SADNESS':
        url = '/images/moods/sadness.png';
        break;
      case 'NEUTRALNESS':
        url = '/images/moods/neutralness.png';
        break;
      case 'HAPPINESS':
        url = '/images/moods/happiness.png';
        break;
      default:
        url = '/images/moods/no-mood.png';
        break;
    }

    return url;
  });
</script>

<style scoped></style>
