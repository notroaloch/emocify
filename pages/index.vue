<!-- TODO: IMPLEMENT AND BIND MOODS WITH MOODCARD COMPONENT -->
<!-- TODO: ADD SHOW ALL CARD/BUTTON IN MOOD SWIPER -->
<!-- TODO: IMPLEMENT BETTER "NO DATA" COMPONENT -->
<template>
  <div
    v-if="isLoading"
    class="flex h-screen w-screen animate-pulse items-center justify-center"
  >
    <p class="">Descargando datos de Spotify</p>
  </div>
  <div v-else class="mb-8 mt-2 flex flex-col gap-8">
    <UiSwiper>
      <template v-slot:header>
        <p class="text-2xl font-bold tracking-tight">Últimos Moods</p>
      </template>
      <MoodCard v-for="mood in moods" :key="mood" :mood="mood" />
      <p v-if="!moods || moods?.length === 0">No hay datos</p>
    </UiSwiper>
    <UDivider label="Estadísticas de Spotify" />
    <UiSwiper>
      <template v-slot:header>
        <p class="text-2xl font-bold tracking-tight">Top de Canciones</p>
      </template>
      <SpotifyTrackCard
        v-for="track in topTracks"
        :key="track.id"
        :track="track"
      />
      <p v-if="!topTracks || topTracks?.length === 0">No hay datos</p>
    </UiSwiper>
    <UiSwiper>
      <template v-slot:header>
        <p class="text-2xl font-bold tracking-tight">Top de Artistas</p>
      </template>
      <SpotifyArtistCard
        v-for="artist in topArtists"
        :key="artist.id"
        :artist="artist"
      />
      <p v-if="!topArtists || topArtists?.length === 0">No hay datos</p>
    </UiSwiper>
    <UiSwiper>
      <template v-slot:header>
        <p class="text-2xl font-bold tracking-tight">Artistas Seguidos</p>
      </template>
      <SpotifyArtistCard
        v-for="artist in followedArtists"
        :key="artist.id"
        :artist="artist"
      />
      <p v-if="!followedArtists || followedArtists?.length === 0">
        No hay datos
      </p>
    </UiSwiper>
  </div>
</template>

<script setup lang="ts">
  const isLoading = useState('isLoadingIndexInit', () => true);
  const { topTracks, topArtists, followedArtists } = useSpotify();

  const moods = useState('moods', () => [1]);

  callOnce('initSpotify', async () => {
    const { init } = useSpotify();
    await init();
    isLoading.value = false;
  });
</script>

<style scoped></style>
