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

  const getUser = async () => {
    const data: SpotifyUser = await $fetch('/api/spotify/user', {
      headers: useRequestHeaders(['cookie']),
    });

    user.value = data;
    return user.value;
  };

  const getUserTopTracks = async () => {
    const data: Track[] = await $fetch('/api/spotify/user/top-items', {
      headers: useRequestHeaders(['cookie']),
      params: {
        type: 'tracks',
      },
    });

    userTopTracks.value = data;
    return userTopTracks.value;
  };

  const getUserTopArtists = async () => {
    const data: Artist[] = await $fetch('/api/spotify/user/top-items', {
      headers: useRequestHeaders(['cookie']),
      params: {
        type: 'artists',
      },
    });

    userTopArtists.value = data;
    return userTopArtists.value;
  };

  const getUserFollowedArtists = async () => {
    const data: Artist[] = await $fetch('/api/spotify/user/followed-artists', {
      headers: useRequestHeaders(['cookie']),
    });

    userFollowedArtists.value = data;
    return userFollowedArtists.value;
  };

  const getUserPlaylists = async () => {
    const data: Playlist[] = await $fetch('/api/spotify/user/playlists', {
      headers: useRequestHeaders(['cookie']),
    });

    userPlaylists.value = data;
    return userPlaylists.value;
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
  };
};
