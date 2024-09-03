<template>
  <!-- MAIN CONTAINER -->
  <div class="group flex w-[200px] select-none flex-col">
    <!-- IMAGE ARTIST -->
    <div
      class="pointer-events-none h-[200px] w-[200px] overflow-clip shadow-md group-hover:shadow-xl group-hover:dark:shadow-gray-800"
    >
      <NuxtImg :src="imageURL" format="webp" loading="lazy" />
    </div>
    <!-- DATA CONTAINER -->
    <div
      class="flex flex-col px-1 py-5 transition-transform group-hover:translate-y-1"
    >
      <!-- ARTIST NAME AND EXTERNAL URL ICON -->
      <div class="flex cursor-pointer items-center">
        <p
          class="group-hover:text-primary line-clamp-1 font-semibold tracking-tight"
          @click="handleClick"
        >
          {{ artist.name }}
        </p>
        <UIcon
          name="ph:arrow-up-right"
          class="group-hover:text-primary h-[15px] w-[15px]"
        />
      </div>
      <!-- SPOTIFY DATA ATTRIBUTION -->
      <div class="mt-2 flex items-center gap-1 text-gray-500">
        <UIcon name="logos:spotify-icon" class="h-[21px] w-[21px]" />
        <p class="text-sm font-extralight tracking-tight">Datos de Spotify</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    artist: Artist;
  }>();

  const { artist } = toRefs(props);

  const imageURL = computed(() => {
    return artist.value.images.at(0)?.url;
  });

  const handleClick = async () => {
    await navigateTo(artist.value.external_urls.spotify, {
      open: {
        target: '_blank',
      },
    });
  };
</script>

<style scoped></style>
