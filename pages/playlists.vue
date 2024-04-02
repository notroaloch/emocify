<template>
  <div class="mb-8 mt-2">
    <p class="text-2xl font-bold tracking-tight">Playlists</p>
    <UiNoDataCard
      class="mt-4"
      label="No tienes ninguna playlist en Spotify"
      v-if="!userPlaylists || userPlaylists.length === 0"
    />
    <div v-else>
      <div class="mt-6 flex flex-col gap-4 lg:grid lg:grid-cols-4">
        <USelectMenu
          class="lg:hidden"
          :disabled="isLoading"
          v-model="currentPlaylist"
          :options="userPlaylists"
          option-attribute="name"
          by="id"
        />
        <UVerticalNavigation
          :links="playlistNavigationItems"
          class="hidden border-r pr-1 lg:col-span-1 lg:block dark:border-gray-800"
        />
        <iframe
          allow="encrypted-media"
          v-show="currentPlaylist"
          class="min-h-[600px] w-full rounded-xl lg:col-span-3"
          :src="iFrameURL"
          frameborder="0"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { userPlaylists, getUserPlaylists, currentPlaylist } = useSpotify();
  const playlistNavigationItems = useState('playlistNavigationItems');

  const { pending: isLoading } = useAsyncData(
    'isLoadingUserPlaylists',
    async () => {
      return await getUserPlaylists();
    }
  );

  const iFrameURL = computed(() => {
    if (!currentPlaylist.value) {
      currentPlaylist.value = userPlaylists.value?.at(0)!;
    }

    if (currentPlaylist.value) {
      return `https://open.spotify.com/embed/playlist/${currentPlaylist.value.id}?utm_source=oembed`;
    }
  });

  watch([userPlaylists, currentPlaylist], () => {
    console.log(currentPlaylist.value);
    playlistNavigationItems.value = userPlaylists.value?.map((playlist) => {
      return {
        label: playlist.name,
        labelClass:
          currentPlaylist.value.id === playlist.id
            ? 'text-primary border-l-4 pl-2 border-primary transition-all'
            : '',
        click: () => {
          currentPlaylist.value = playlist;
        },
      };
    });
    currentPlaylist.value = currentPlaylist.value;
  });
</script>

<style scoped></style>
