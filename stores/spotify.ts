export const useSpotifyStore = defineStore('spotifyStore', () => {
  const user: Ref<SpotifyUser | undefined> = useState('spotifyUser');
  const topTracks: Ref<Track[] | undefined> = useState('spotifyUserTopTracks');
  const topArtists: Ref<Artist[] | undefined> = useState(
    'spotifyUserTopArtists'
  );
  const followedArtists: Ref<Artist[] | undefined> = useState(
    'spotifyUserFollowedArtists'
  );
  const playlists: Ref<Playlist[] | undefined> = useState(
    'spotifyUserPlaylists'
  );

  const currentPlaylist: Ref<Playlist> | undefined =
    useState('currentPlaylist');

  return {
    user,
    topTracks,
    topArtists,
    followedArtists,
    playlists,
    currentPlaylist,
  };
});
