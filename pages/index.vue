<template>
  <div class="w-full py-8 flex flex-col gap-12">
    <div class="flex flex-col gap-6">
      <p class="text-2xl font-bold tracking-tight">Top de Canciones</p>
      <Swiper>
        <TrackCard v-for="track in topTracks" :key="track.id" :track="track" />
      </Swiper>
    </div>
    <div class="flex flex-col gap-6">
      <p class="text-2xl font-bold tracking-tight">Artistas Seguidos</p>
      <Swiper>
        <ArtistCard
          v-for="artist in topArtists"
          :key="artist.id"
          :artist="artist"
        />
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { topTracks, topArtists, followedArtists } = useSpotify();
</script>

<style scoped></style>
