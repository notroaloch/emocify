<template>
  <div class="mb-8 mt-2">
    <p class="text-2xl font-bold tracking-tight">Playlists</p>
    <div class="mt-4 flex flex-col gap-4 lg:grid lg:grid-cols-4">
      <USelectMenu
        class="lg:hidden"
        v-model="currentPlaylist"
        :options="playlists"
        option-attribute="name"
        by="id"
      />
      <UVerticalNavigation
        :links="playlistNavigationItems"
        class="hidden border-r pr-1 lg:col-span-1 lg:block dark:border-gray-800"
      />
      <iframe
        v-show="currentPlaylist"
        class="min-h-[600px] w-full rounded-xl lg:col-span-3"
        :src="iFrameURL"
        frameborder="0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const { init, currentPlaylist, playlists } = useSpotify();
  await init();

  const iFrameURL = computed(() => {
    if (!currentPlaylist.value) {
      currentPlaylist.value = playlists.value?.at(0)!;
    }

    if (currentPlaylist.value) {
      return `https://open.spotify.com/embed/playlist/${currentPlaylist.value.id}?utm_source=oembed`;
    }
  });

  const playlistNavigationItems = computed(() => {
    return playlists.value?.map((playlist) => {
      return {
        label: playlist.name,
        labelClass:
          currentPlaylist.value === playlist
            ? 'text-primary border-l-4 pl-2 border-primary transition-all'
            : '',
        click: () => {
          currentPlaylist.value = playlist;
        },
      };
    });
  });
</script>

<style scoped></style>
