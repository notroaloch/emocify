<template>
  <!-- MAIN CONTAINER -->
  <div class="">
    <!-- IMAGE CONTAINER (CROP OVERFLOW) -->
    <div>
      <NuxtImg />
    </div>
    <!-- DATA CONTAINER -->
    <div></div>
  </div>
  <!-- <div class="group group flex w-[200px] cursor-pointer flex-col gap-5 pb-2">
    <div
      class="h-[200px] overflow-clip shadow-md group-hover:shadow-xl group-hover:dark:shadow-gray-800"
    >
      <NuxtImg :src="imageURL" fit="inside" class="" />
    </div>
    <div
      class="flex flex-col gap-1 px-2 transition-transform group-hover:translate-y-1"
    >
      <div class="flex items-center">
        <p
          class="group-hover:text-primary line-clamp-1 font-semibold tracking-tight"
          @click="handleClick"
        >
          {{ artist.name }}
        </p>
        <UIcon
          name="i-material-symbols-arrow-outward-rounded"
          class="text-primary hidden h-[15px] w-[15px] group-hover:block"
        />
      </div>
      <div class="flex items-center gap-1 text-gray-500">
        <UIcon name="i-mdi-spotify" class="h-[21px] w-[21px]" />
        <p class="text-sm font-extralight tracking-tight">Datos de Spotify</p>
      </div>
    </div>
  </div> -->
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
