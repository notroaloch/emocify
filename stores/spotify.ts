export const useSpotifyStore = defineStore('spotify', () => {
  const user = ref<SpotifyUser>();
  const topTracks = ref<Track[]>();
  const topArtists = ref<Artist[]>();
  const followedArtists = ref<Artist[]>();
  const playlists = ref<Playlist[]>();

  const fetchUser = async () => {
    const data = await $fetch<SpotifyUser>('/api/spotify/user', {
      headers: useRequestHeaders(['cookie']),
    });

    user.value = data;
  };

  const fetchTopTracks = async () => {
    const data = await $fetch<Track[]>('/api/spotify/user/top-items', {
      headers: useRequestHeaders(['cookie']),
      query: {
        type: 'tracks',
      },
    });

    topTracks.value = data;
    return topTracks.value;
  };

  const fetchTopArtists = async () => {
    const data = await $fetch<Artist[]>('/api/spotify/user/top-items', {
      headers: useRequestHeaders(['cookie']),
      query: {
        type: 'artists',
      },
    });

    topArtists.value = data;
    return topArtists.value;
  };

  const fetchFollowedArtists = async () => {
    const data = await $fetch<Artist[]>('/api/spotify/user/followed-artists', {
      headers: useRequestHeaders(['cookie']),
    });

    followedArtists.value = data;
    return followedArtists.value;
  };

  const fetchPlaylists = async () => {
    const data = await $fetch<Playlist[]>('/api/spotify/user/playlists', {
      headers: useRequestHeaders(['cookie']),
    });

    playlists.value = data;
  };

  const followedAndTopArtist = computed(() => {
    if (!followedArtists.value || !topArtists.value) return undefined;

    const artists = followedArtists.value.reduce(
      (acc, item) => {
        return acc.includes(item) ? acc : [...acc, item];
      },
      [...topArtists.value]
    );

    return artists;
  });

  const createMoodPlaylist = async (mood: Mood) => {
    const { getAudioFeaturesConfig, getRecommendationSeeds } = useSpotify();

    const { trackSeed, artistSeed } = getRecommendationSeeds();
    const { valence, energy, danceability } = getAudioFeaturesConfig(mood);

    const playlist = await $fetch<Playlist>('/api/spotify/user/playlists', {
      method: 'POST',
      body: {
        name: `EMOCIFY ${mood.emotion} - ${mood.id?.slice(0, 3)}`,
        isPublic: false,
        isCollaborative: false,
        description:
          'Playlist generada automáticamente desde emocify.vercel.app',
      },
      headers: useRequestHeaders(['cookie']),
    });

    const tracks = await $fetch<Track[]>('/api/spotify/recommendations', {
      method: 'POST',
      body: {
        seeds: {
          artist: artistSeed,
          track: trackSeed,
        },
        audioFeatures: {
          valence,
          energy,
          danceability,
        },
      },
      headers: useRequestHeaders(['cookie']),
    });

    await $fetch('/api/spotify/user/playlists', {
      method: 'PUT',
      query: {
        id: playlist.id,
      },
      body: {
        uris: tracks.map((track) => track.uri),
      },
      headers: useRequestHeaders(['cookie']),
    });

    return playlist;
  };

  return {
    user,
    topTracks,
    topArtists,
    followedArtists,
    followedAndTopArtist,
    playlists,
    fetchUser,
    fetchTopTracks,
    fetchTopArtists,
    fetchFollowedArtists,
    fetchPlaylists,
    createMoodPlaylist,
  };
});
