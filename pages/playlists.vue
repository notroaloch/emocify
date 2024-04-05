<template>
  <div class="mb-24 mt-2">
    <p class="text-2xl font-bold tracking-tight">Playlists</p>
    <div>
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
          class="h-[calc(100vh-180px)] w-full rounded-xl lg:col-span-3"
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
    if (!currentPlaylist.value || !userPlaylists.value) {
      return;
    }

    const normalPlaylists: any[] = [];
    const emocifyPlaylists: any[] = [];

    userPlaylists.value.forEach((playlist) => {
      const p = {
        label: playlist.name,
        labelClass:
          currentPlaylist.value.id === playlist.id
            ? 'text-primary border-l-4 pl-2 border-primary transition-all'
            : '',
        click: () => {
          currentPlaylist.value = playlist;
        },
      };

      if (playlist.name.toUpperCase().includes('EMOCIFY')) {
        emocifyPlaylists.push(p);
        return;
      }

      normalPlaylists.push(p);
    });

    if (emocifyPlaylists.length > 0) {
      playlistNavigationItems.value = [emocifyPlaylists, normalPlaylists];
    } else {
      playlistNavigationItems.value = normalPlaylists;
    }

    currentPlaylist.value = currentPlaylist.value;
  });

  callOnce('index-callOnce', async () => {
    if (!userPlaylists.value) {
      await getUserPlaylists();
    }
  });
</script>

<style scoped></style>
