export const useSpotifyStore = defineStore('spotify', () => {
  const user: Ref<SpotifyUser | undefined> = useState('spotify-user');
  const userTopTracks: Ref<Track[] | undefined> = useState(
    'spotify-userTopTracks'
  );
  const userTopArtists: Ref<Artist[] | undefined> = useState(
    'spotify-userTopArtists'
  );
  const userFollowedArtists: Ref<Artist[] | undefined> = useState(
    'spotify-userFollowedArtists'
  );
  const userPlaylists: Ref<Playlist[] | undefined> = useState(
    'spotify-userPlaylists'
  );

  const currentPlaylist: Ref<Playlist> | undefined = useState(
    'spotify-currentPlaylist'
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
