export const useSpotifyStore = defineStore('spotify', () => {
  const user: Ref<SpotifyUser | undefined> = useState('spotifyUser');
  const topTracks: Ref<Track[] | undefined> = useState('spotifyUserTopTracks');
  const topArtists: Ref<Artist[] | undefined> = useState(
    'spotifyUserTopArtists'
  );
  const followedArtists: Ref<Artist[] | undefined> = useState(
    'spotifyUserTopArtists'
  );
  const playlists: Ref<Playlist[] | undefined> = useState(
    'spotifyUserPlaylists'
  );

  return { user, topTracks, topArtists, followedArtists, playlists };
});
