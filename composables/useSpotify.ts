export const useSpotify = () => {
  const spotifyStore = useSpotifyStore();
  const { user, topTracks, topArtists, followedArtists, playlists } =
    storeToRefs(spotifyStore);

  watch(
    [user, topTracks, topArtists, followedArtists, playlists],
    async ([_user, _topTracks, _topArtists, _followedArtists, _playlists]) => {
      if (!_user) {
        const userData: SpotifyUser = await $fetch('/api/spotify/user');
        user.value = userData;
        return;
      }

      if (!_topTracks) {
        const topTracksData: any = await $fetch('/api/spotify/user/top-items', {
          params: { type: 'tracks' },
        });
        topTracks.value = topTracksData;
      }

      if (!_topArtists) {
        const topArtistsData: any = await $fetch(
          '/api/spotify/user/top-items',
          {
            params: { type: 'artists' },
          }
        );
        topArtists.value = topArtistsData;
      }

      if (!_followedArtists) {
        const followedArtistsData: any = await $fetch(
          '/api/spotify/user/followed-artists'
        );
        followedArtists.value = followedArtistsData;
      }

      if (!_playlists) {
        const playlistsData: any = await $fetch('/api/spotify/user/playlists');
        playlists.value = playlistsData;
      }
    },
    { immediate: true }
  );

  return { user, topTracks, topArtists, followedArtists, playlists };
};
