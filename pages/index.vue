<template>
  <div class="my-8 flex flex-col gap-8">
    <Swiper>
      <template v-slot:header>
        <p class="text-2xl font-bold tracking-tight">Top de Canciones</p>
      </template>
      <TrackCard v-for="track in topTracks" :key="track.id" :track="track" />
    </Swiper>
    <Swiper>
      <template v-slot:header>
        <p class="text-2xl font-bold tracking-tight">Artistas Seguidos</p>
      </template>
      <ArtistCard
        v-for="artist in followedArtists"
        :key="artist.id"
        :artist="artist"
      />
    </Swiper>
  </div>
</template>

<script setup lang="ts">
  const { topTracks, topArtists, followedArtists } = useSpotify();
</script>

<style scoped></style>
