export const useSpotify = () => {
  const headers = useRequestHeaders(['cookie']);
  const spotifyStore = useSpotifyStore();
  const { user, topTracks, topArtists, followedArtists, playlists } =
    storeToRefs(spotifyStore);

  const init = async () => {
    if (user.value) {
      return;
    }

    await Promise.all([
      // USER PROFILE
      $fetch('/api/spotify/user', { headers }),
      // TOP USER TRACKS
      $fetch('/api/spotify/user/top-items', {
        params: { type: 'tracks' },
        headers,
      }),
      // TOP USER ARTISTS
      $fetch('/api/spotify/user/top-items', {
        params: { type: 'artists' },
        headers,
      }),
      // USER FOLLOWED ARTISTS
      $fetch('/api/spotify/user/followed-artists', { headers }),
      // USER PLAYLISTS
      $fetch('/api/spotify/user/playlists', { headers }),
    ]).then(
      ([_user, _topTracks, _topArtists, _followedArtists, _playlists]: any) => {
        user.value = _user;
        topTracks.value = _topTracks;
        topArtists.value = _topArtists;
        followedArtists.value = _followedArtists;
        playlists.value = _playlists;
      }
    );
  };

  return {
    user,
    topTracks,
    topArtists,
    followedArtists,
    playlists,
    init,
  };
};
