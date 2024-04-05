export const useSpotifyStore = defineStore('spotifyStore', () => {
  const user: Ref<SpotifyUser | undefined> = useState('spotifyStore-user');
  const userTopTracks: Ref<Track[] | undefined> = useState(
    'spotifyStore-userTopTracks'
  );
  const userTopArtists: Ref<Artist[] | undefined> = useState(
    'spotifyStore-userTopArtists'
  );
  const userFollowedArtists: Ref<Artist[] | undefined> = useState(
    'spotifyStore-userFollowedArtists'
  );
  const userPlaylists: Ref<Playlist[] | undefined> = useState(
    'spotifyStore-userPlaylists'
  );

  const currentPlaylist: Ref<Playlist> | undefined = useState(
    'spotifyStore-currentPlaylist'
  );

  return {
    user,
    userTopTracks,
    userTopArtists,
    userFollowedArtists,
    userPlaylists,
    currentPlaylist,
  };
});
