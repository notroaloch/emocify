<template>
  <div class="mb-24 mt-2 flex flex-col gap-8">
    <!-- MOODS SWIPER -->
    <UiSwiper>
      <template v-slot:header>
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
      <MoodCardPlaceholder
        v-if="isLoadingMoods || latestMoods!.length === 0"
        :empty="isArrayEmpty(latestMoods)"
      />
      <!-- MOOD CARD -->
      <MoodCard
        v-else
        v-for="mood in latestMoods"
        :key="mood.id"
        :mood="mood"
      />
    </UiSwiper>

    <UDivider label="Estadísticas de Spotify" />

    <!-- TOP SONGS SWIPER -->
    <UiSwiper>
      <template v-slot:header>
        <p class="text-2xl font-bold tracking-tight">Top de Canciones</p>
      </template>
      <!-- RENDERS LOADING AND EMPTY STATE -->
      <SpotifyTrackPlaceholder
        v-if="isLoadingTracks || userTopTracks!.length === 0"
        :empty="isArrayEmpty(userTopTracks)"
      />
      <!-- TRACK CARD -->
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
      <!-- RENDERS LOADING AND EMPTY STATE -->
      <SpotifyArtistPlaceholder
        v-if="isLoadingArtists || userTopArtists!.length === 0"
        :empty="isArrayEmpty(userTopArtists)"
      />
      <!-- ARTIST CARD -->
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
      <!-- RENDERS LOADING AND EMPTY STATE -->
      <SpotifyArtistPlaceholder
        v-if="isLoadingFollowedArtists || userFollowedArtists!.length === 0"
        :empty="isArrayEmpty(userFollowedArtists)"
      />
      <!-- ARTIST CARD -->
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

  const { moods, getMoods } = useMood();

  const isLoadingMoods = useState('index-isLoadingMoods', () => true);
  const isLoadingTracks = useState('index-isLoadingTracks', () => true);
  const isLoadingArtists = useState('index-isLoadingArtists', () => true);
  const isLoadingFollowedArtists = useState(
    'index-isLoadingFollowedArtists',
    () => true
  );

  // GETS THE LATEST N MOODS
  const latestMoods = computed(() => {
    const numberOfMoodsToShow = 4;
    if (!moods.value) return undefined;
    if (moods.value?.length === 0) return [];
    if (moods.value.length >= numberOfMoodsToShow)
      return moods.value.slice(0, numberOfMoodsToShow);

    return moods.value;
  });

  // FETCH INITIAL DATA
  callOnce('index-callOnce', async () => {
    if (
      !moods.value ||
      !userTopTracks.value ||
      !userTopArtists.value ||
      !userFollowedArtists.value
    ) {
      isLoadingMoods.value = true;
      isLoadingTracks.value = true;
      isLoadingArtists.value = true;
      isLoadingFollowedArtists.value = true;

      await Promise.all([
        getMoods(),
        getUserTopTracks(),
        getUserTopArtists(),
        getUserFollowedArtists(),
      ]);

      isLoadingMoods.value = false;
      isLoadingTracks.value = false;
      isLoadingArtists.value = false;
      isLoadingFollowedArtists.value = false;
    }
  });
</script>

<style scoped></style>
