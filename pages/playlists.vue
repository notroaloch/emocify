<template>
  <div class="mb-24 mt-2">
    <p class="text-2xl font-bold tracking-tight">Playlists</p>
    <div>
      <div class="mt-4 flex flex-col gap-4 lg:grid lg:grid-cols-4">
        <USelectMenu
          v-model="currentPlaylist"
          class="lg:hidden"
          :loading="!playlists"
          :disabled="!playlists"
          :options="orderedPlaylists"
          option-attribute="name"
          by="id"
        />
        <UVerticalNavigation
          :links="navigationItems"
          class="hidden border-r pr-1 lg:col-span-1 lg:block dark:border-gray-800"
        />
        <iframe
          v-if="currentPlaylist"
          allow="encrypted-media"
          class="h-[calc(100vh-180px)] w-full rounded-xl lg:col-span-3"
          :src="iFramePlaylistUrl"
          frameborder="0"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { playlists } = storeToRefs(useSpotifyStore());
  const { fetchPlaylists } = useSpotifyStore();

  const currentPlaylist = useState<Playlist>('currentPlaylist');

  useAsyncData('playlists', () => fetchPlaylists());

  const iFramePlaylistUrl = computed(() => {
    const id = currentPlaylist.value?.id;
    return `https://open.spotify.com/embed/playlist/${id}?utm_source=oembed`;
  });

  const orderedPlaylists = computed(() => {
    return playlists.value?.toSorted((a, b) => {
      if (a.name.includes('EMOCIFY') && !b.name.includes('EMOCIFY')) return -1;
      else if (!a.name.includes('EMOCIFY') && b.name.includes('EMOCIFY'))
        return 1;
      else return 0;
    });
  });

  const navigationItems = computed(() => {
    return orderedPlaylists.value?.map((playlist) => {
      return {
        label: playlist.name,
        labelClass:
          currentPlaylist.value?.id === playlist.id
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
