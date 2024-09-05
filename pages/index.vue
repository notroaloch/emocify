<template>
  <div class="mb-24 mt-2 flex flex-col gap-8">
    <!-- MOODS SWIPER -->
    <UiSwiper>
      <template #header>
        <div class="flex items-center gap-3">
          <p class="text-2xl font-bold tracking-tight">Últimos Moods</p>
          <ULink
            to="/facescan"
            inactive-class="text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all"
          >
            Nuevo
          </ULink>
        </div>
      </template>
      <!-- RENDERS LOADING AND EMPTY STATE -->
      <MoodCardPlaceholder v-if="!moods" :empty="isArrayEmpty(moods)" />
      <!-- MOOD CARD -->
      <MoodCard v-for="mood in moods" v-else :key="mood.id" :mood="mood" />
    </UiSwiper>

    <UDivider label="Estadísticas de Spotify" />

    <!-- TOP SONGS SWIPER -->
    <UiSwiper>
      <template #header>
        <p class="text-2xl font-bold tracking-tight">Top de Canciones</p>
      </template>
      <!-- RENDERS LOADING AND EMPTY STATE -->
      <SpotifyTrackPlaceholder
        v-if="!topTracks"
        :empty="isArrayEmpty(topTracks)"
      />
      <!-- TRACK CARD -->
      <SpotifyTrackCard
        v-for="track in topTracks"
        v-else
        :key="track.id"
        :track="track"
      />
    </UiSwiper>

    <!-- TOP ARTISTS SWIPER -->
    <UiSwiper>
      <template #header>
        <p class="text-2xl font-bold tracking-tight">Top de Artistas</p>
      </template>
      <!-- RENDERS LOADING AND EMPTY STATE -->
      <SpotifyArtistPlaceholder
        v-if="!topArtists"
        :empty="isArrayEmpty(topArtists)"
      />
      <!-- ARTIST CARD -->
      <SpotifyArtistCard
        v-for="artist in topArtists"
        v-else
        :key="artist.id"
        :artist="artist"
      />
    </UiSwiper>

    <!-- FOLLOWED ARTISTS SWIPER -->
    <UiSwiper>
      <template #header>
        <p class="text-2xl font-bold tracking-tight">Artistas Seguidos</p>
      </template>
      <!-- RENDERS LOADING AND EMPTY STATE -->
      <SpotifyArtistPlaceholder
        v-if="!followedArtists"
        :empty="isArrayEmpty(followedArtists)"
      />
      <!-- ARTIST CARD -->
      <SpotifyArtistCard
        v-for="artist in followedArtists"
        v-else
        :key="artist.id"
        :artist="artist"
      />
    </UiSwiper>
  </div>
</template>

<script setup lang="ts">
  const { topTracks, topArtists, followedArtists } =
    storeToRefs(useSpotifyStore());
  const { fetchTopTracks, fetchTopArtists, fetchFollowedArtists } =
    useSpotifyStore();

  // CACHES DATA TO PREVENT API REQUESTS ON EVERY PAGE NAVIGATION
  const nuxtApp = useNuxtApp();
  useAsyncData('top-tracks', () => fetchTopTracks(), {
    getCachedData(key) {
      useAsyncDataCacheFunction(key, nuxtApp);
    },
  });
  useAsyncData('top-artists', () => fetchTopArtists(), {
    getCachedData(key) {
      useAsyncDataCacheFunction(key, nuxtApp);
    },
  });
  useAsyncData('followed-artists', () => fetchFollowedArtists(), {
    getCachedData(key) {
      useAsyncDataCacheFunction(key, nuxtApp);
    },
  });

  const { moods, getMoods } = useMood();
  useAsyncData('moods', () => getMoods());
</script>

<style scoped></style>
