<template>
  <div class="my-8 flex flex-col gap-8">
    <UiSwiper>
      <template v-slot:header>
        <p class="text-2xl font-bold tracking-tight">Últimos Moods</p>
      </template>
      <MoodCard
        v-for="track in topTracks?.slice(0, 4)"
        :key="track.id"
        :mood="track"
      />
      <p v-if="!topTracks || topTracks?.length === 0">No hay datos</p>
    </UiSwiper>
    <UDivider label="Estadísticas de Spotify" />
    <UiSwiper>
      <template v-slot:header>
        <p class="text-2xl font-bold tracking-tight">Top de Canciones</p>
      </template>
      <TrackCard v-for="track in topTracks" :key="track.id" :track="track" />
      <p v-if="!topTracks || topTracks?.length === 0">No hay datos</p>
    </UiSwiper>
    <UiSwiper>
      <template v-slot:header>
        <p class="text-2xl font-bold tracking-tight">Top de Artistas</p>
      </template>
      <ArtistCard
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
      <ArtistCard
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
  const { init, topTracks, topArtists, followedArtists } = useSpotify();
  await init();
</script>

<style scoped></style>
