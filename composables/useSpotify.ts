export const useSpotify = () => {
  const spotifyStore = useSpotifyStore();
  const {
    user,
    userTopTracks,
    userTopArtists,
    userFollowedArtists,
    userPlaylists,
    currentPlaylist,
  } = storeToRefs(spotifyStore);

  const { currentMood } = useMood();

  const getUser = async () => {
    const data: SpotifyUser = await $fetch('/api/spotify/user', {
      headers: useRequestHeaders(['cookie']),
    });

    user.value = data;
    return data;
  };

  const getUserTopTracks = async () => {
    const data: Track[] = await $fetch('/api/spotify/user/top-items', {
      headers: useRequestHeaders(['cookie']),
      query: {
        type: 'tracks',
      },
    });

    userTopTracks.value = data;
    return data;
  };

  const getUserTopArtists = async () => {
    const data: Artist[] = await $fetch('/api/spotify/user/top-items', {
      headers: useRequestHeaders(['cookie']),
      query: {
        type: 'artists',
      },
    });

    userTopArtists.value = data;
    return data;
  };

  const getUserFollowedArtists = async () => {
    const data: Artist[] = await $fetch('/api/spotify/user/followed-artists', {
      headers: useRequestHeaders(['cookie']),
    });
    userFollowedArtists.value = data;
    return data;
  };

  const getUserPlaylists = async () => {
    const data: Playlist[] = await $fetch('/api/spotify/user/playlists', {
      headers: useRequestHeaders(['cookie']),
    });

    userPlaylists.value = data;
    return data;
  };

  const createMoodedPlaylist = async (mood: Mood) => {
    const name = generatePlaylistName(mood);
    const description = generatePlaylistDescription();
    const artists = getArtistsAsUniqueArray(
      userTopArtists.value!,
      userFollowedArtists.value!
    );

    const data: { mood: Mood; playlist: Playlist } = await $fetch(
      '/api/spotify/user/mooded-playlist',
      {
        method: 'POST',
        headers: useRequestHeaders(['cookie']),
        body: {
          name,
          description,
          artists,
          mood,
        },
      }
    );

    userPlaylists.value?.unshift(data.playlist);
    currentPlaylist.value = data.playlist;
    currentMood.value = data.mood;

    return data;
  };

  return {
    user,
    userTopTracks,
    userTopArtists,
    userFollowedArtists,
    userPlaylists,
    currentPlaylist,
    getUser,
    getUserTopTracks,
    getUserTopArtists,
    getUserFollowedArtists,
    getUserPlaylists,
    createMoodedPlaylist,
  };
};
