<template>
  <div
    class="w-[200px] pb-2 flex flex-col gap-5 group cursor-pointer"
    @click="handleClick"
  >
    <NuxtImg
      :src="imageURL"
      class="shadow-md group-hover:shadow-xl group-hover:dark:shadow-gray-800"
    />
    <div
      class="flex flex-col gap-2 px-2 group-hover:translate-y-1 transition-transform"
    >
      <div>
        <div class="flex items-center">
          <p
            class="font-semibold tracking-tight line-clamp-1 group-hover:text-primary"
          >
            {{ track.name }}
          </p>
          <UIcon
            name="i-material-symbols-arrow-outward-rounded"
            class="w-[15px] h-[15px] hidden group-hover:block text-primary"
          />
        </div>

        <p class="font-light tracking-tighter line-clamp-1">
          {{ trackArtists }}
        </p>
        <p class="font-extralight tracking-tighter line-clamp-1">
          {{ track.album.name }}
        </p>
      </div>
      <div class="flex items-center gap-1 text-gray-500">
        <UIcon name="i-mdi-spotify" class="w-[21px] h-[21px]" />
        <p class="text-sm tracking-tight font-extralight">Datos de Spotify</p>
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
