<template>
  <!-- MAIN CONTAINER -->
  <div class="group flex w-[200px] select-none flex-col">
    <!-- IMAGE ARTWORK -->
    <div
      class="pointer-events-none h-[200px] w-[200px] overflow-clip shadow-md group-hover:shadow-xl group-hover:dark:shadow-gray-800"
    >
      <NuxtImg :src="imageURL" format="webp" loading="lazy" />
    </div>
    <!-- DATA CONTAINER -->
    <div
      class="flex flex-col px-1 py-5 transition-transform group-hover:translate-y-1"
    >
      <!-- TRACK NAME AND EXTERNAL URL ICON -->
      <div class="flex cursor-pointer items-center">
        <p
          class="group-hover:text-primary line-clamp-1 font-semibold tracking-tight"
          @click="handleClick"
        >
          {{ track.name }}
        </p>
        <UIcon
          name="ph:arrow-up-right"
          class="group-hover:text-primary h-[15px] w-[15px]"
        />
      </div>
      <!-- TRACK ARTISTS -->
      <p class="line-clamp-1 font-light tracking-tighter">
        {{ trackArtists }}
      </p>
      <!-- TRACK ALBUM -->
      <p class="line-clamp-1 font-extralight tracking-tighter">
        {{ track.album.name }}
      </p>
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
    track: Track;
  }>();

  const { track } = toRefs(props);

  const imageURL = computed(() => {
    return track.value.album.images.at(0)?.url;
  });

  const trackArtists = computed(() => {
    return track.value.artists
      .map((artist) => {
        return artist.name;
      })
      .join(', ');
  });

  const handleClick = async () => {
    await navigateTo(track.value.external_urls.spotify, {
      open: {
        target: '_blank',
      },
    });
  };
</script>

<style scoped></style>
