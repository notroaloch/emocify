<!-- TODO: IMPLEMENT AND BIND MOODS WITH MOODCARD COMPONENT -->
<!-- TODO: ADD SHOW ALL CARD/BUTTON IN MOOD SWIPER -->
<!-- TODO: IMPLEMENT BETTER "NO DATA" COMPONENT -->
<template>
  <div class="mb-8 mt-2 flex flex-col gap-8">
    <!-- MOODS SWIPER -->
    <UiSwiper>
      <template v-slot:header>
        <p class="text-2xl font-bold tracking-tight">Últimos Moods</p>
      </template>
      <MoodCard v-for="mood in moods" :key="mood" :mood="mood" />
    </UiSwiper>

    <UDivider label="Estadísticas de Spotify" />

    <!-- TOP SONGS SWIPER -->
    <UiSwiper>
      <template v-slot:header>
        <p class="text-2xl font-bold tracking-tight">Top de Canciones</p>
      </template>
      <SpotifyTrackPlaceholder v-if="isLoadingUserTopTracks" />
      <UiNoDataCard
        label="No tienes suficiente historial de escucha en Spotify para generar esta información"
        v-else-if="!isLoadingUserTopTracks && userTopTracks?.length === 0"
      />
      <SpotifyTrackCard
        v-else
        v-for="track in userTopTracks"
        :key="track.id"
        :track="track"
      />
    </UiSwiper>

    <!-- TOP ARTISTS SWIPER -->
    <UiSwiper>
      <template v-slot:header>
        <p class="text-2xl font-bold tracking-tight">Top de Artistas</p>
      </template>
      <SpotifyArtistPlaceholder v-if="isLoadingUserTopArtists" />
      <UiNoDataCard
        label="No tienes suficiente historial de escucha en Spotify para generar esta información"
        v-else-if="!isLoadingUserTopArtists && userTopArtists?.length === 0"
      />
      <SpotifyArtistCard
        v-else
        v-for="artist in userTopArtists"
        :key="artist.id"
        :artist="artist"
      />
    </UiSwiper>

    <!-- FOLLOWED ARTISTS SWIPER -->
    <UiSwiper>
      <template v-slot:header>
        <p class="text-2xl font-bold tracking-tight">Artistas Seguidos</p>
      </template>
      <SpotifyArtistPlaceholder v-if="isLoadingUserFollowedArtists" />
      <UiNoDataCard
        label="No sigues a ningún artista en Spotify"
        v-else-if="
          !isLoadingUserFollowedArtists && userFollowedArtists?.length === 0
        "
      />
      <SpotifyArtistCard
        v-else
        v-for="artist in userFollowedArtists"
        :key="artist.id"
        :artist="artist"
      />
    </UiSwiper>
  </div>
</template>

<script setup lang="ts">
  const {
    userTopTracks,
    userTopArtists,
    userFollowedArtists,
    getUserTopTracks,
    getUserTopArtists,
    getUserFollowedArtists,
  } = useSpotify();

  const moods = useState('moods', () => [1, 2, 3]);

  const { pending: isLoadingUserTopTracks } = useAsyncData(
    'isLoadingUserTopTracks',
    async () => {
      return await getUserTopTracks();
    }
  );
  const { pending: isLoadingUserTopArtists } = useAsyncData(
    'isLoadingUserTopTracks',
    async () => {
      return await getUserTopArtists();
    }
  );
  const { pending: isLoadingUserFollowedArtists } = useAsyncData(
    'isLoadingUserFollowedArtists',
    async () => {
      return await getUserFollowedArtists();
    }
  );
</script>

<style scoped></style>
