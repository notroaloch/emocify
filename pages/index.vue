<template>
  <div class="mb-8 mt-2 flex flex-col gap-8">
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
        :empty="isEmpty(latestMoods)"
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
        :empty="isEmpty(userTopTracks)"
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
        :empty="isEmpty(userTopArtists)"
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
        :empty="isEmpty(userFollowedArtists)"
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

  const isLoadingMoods = useState('isLoadingMoods', () => true);
  const isLoadingTracks = useState('isLoadingTracks', () => true);
  const isLoadingArtists = useState('isLoadingArtists', () => true);
  const isLoadingFollowedArtists = useState(
    'isLoadingFollowedArtists',
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

  const setLoadingStates = (state: boolean) => {
    isLoadingMoods.value = state;
    isLoadingTracks.value = state;
    isLoadingArtists.value = state;
    isLoadingFollowedArtists.value = state;
  };

  // FETCH INITIAL DATA
  callOnce('/index - Initial Fetch', async () => {
    if (
      !moods.value ||
      !userTopTracks.value ||
      !userTopArtists.value ||
      !userFollowedArtists.value
    ) {
      setLoadingStates(true);
      await Promise.all([
        getMoods(),
        getUserTopTracks(),
        getUserTopArtists(),
        getUserFollowedArtists(),
      ]);
      setLoadingStates(false);
    }
  });
</script>

<style scoped></style>
