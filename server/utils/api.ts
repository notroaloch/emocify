export const spotifyAPI = {
  baseURL: 'https://api.spotify.com/v1',
  endpoints: {
    getCurrentUser: '/me',
    getCurrentUserTopItems: '/me/top',
    getCurrentUserSavedTracks: '/me/tracks',
    getCurrentUserPlaylists: '/me/playlists',
    getCurrentUserFollowedArtists: '/me/following',
    getSeveralTracksAudioFeatures: '/audio-features',
    getRecommendations: '/recommendations',
    getArtistTopTracks: '/artists', // artists/id/top-tracks
  },
};
