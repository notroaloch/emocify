<template>
  <div
    class="w-[200px] group pb-2 flex flex-col gap-5 group cursor-pointer"
    @click="handleClick"
  >
    <div
      class="h-[200px] overflow-clip shadow-md group-hover:shadow-xl group-hover:dark:shadow-gray-800"
    >
      <NuxtImg :src="imageURL" fit="inside" class="" />
    </div>
    <div
      class="flex flex-col gap-1 px-2 group-hover:translate-y-1 transition-transform"
    >
      <div class="flex items-center">
        <p
          class="font-semibold tracking-tight line-clamp-1 group-hover:text-primary"
        >
          {{ artist.name }}
        </p>
        <UIcon
          name="i-material-symbols-arrow-outward-rounded"
          class="w-[15px] h-[15px] hidden group-hover:block text-primary"
        />
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
