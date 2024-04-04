export const getArtistTopTracks = async (authToken: string, artist: Artist) => {
  const data: any = await $fetch('/artists/' + artist.id + '/top-tracks', {
    baseURL: spotifyAPI.baseURL,
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
  });

  return data.tracks;
};

export const getSeveralTracksAudioFeatures = async (
  authToken: string,
  tracks: Track[]
) => {
  const ids = tracks.map((track: Track) => track.id);
  const data: any = await $fetch(
    spotifyAPI.endpoints.getSeveralTracksAudioFeatures,
    {
      baseURL: spotifyAPI.baseURL,
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
      params: {
        ids: ids.join(','),
      },
    }
  );

  return data.audio_features;
};

export const classifyAudioFeaturesByEmotion = (
  emotion: string,
  audioFeatures: any[]
) => {
  const filteredURIS: string[] = [];

  audioFeatures.forEach((audioFeature) => {
    const { uri, danceability, energy, valence } = audioFeature;

    switch (emotion) {
      case 'ANGRY':
        if (valence < 0.4 && energy >= 0.5) {
          filteredURIS.push(uri);
        }
        break;
      case 'SAD':
        if (valence < 0.4 && energy <= 0.5 && danceability <= 0.5) {
          filteredURIS.push(uri);
        }
        break;
      case 'NEUTRAL':
        if (valence >= 0.4 && valence <= 0.6) {
          filteredURIS.push(uri);
        }
        break;
      case 'HAPPY':
        if (valence > 0.6 && energy >= 0.5 && danceability >= 0.5) {
          filteredURIS.push(uri);
        }
        break;
      default:
        break;
    }
  });

  return filteredURIS;
};

export const createPlaylist = async (
  authToken: string,
  userID: string,
  name: string
) => {
  const data: any = await $fetch('/users/' + userID + '/playlists', {
    method: 'POST',
    baseURL: spotifyAPI.baseURL,
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
    body: {
      name,
      public: false,
      description: 'Playlist generada automáticamente desde EMOCIFY',
    },
  });

  return data.id;
};

export const addTracksToPlaylist = async (
  authToken: string,
  id: string,
  uris: string[]
) => {
  const data: any = await $fetch('/playlists/' + id + '/tracks', {
    method: 'POST',
    baseURL: spotifyAPI.baseURL,
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
    body: {
      uris,
    },
  });

  return data;
};

export const getPlaylist = async (authToken: string, id: string) => {
  const data: any = await $fetch('/playlists/' + id, {
    baseURL: spotifyAPI.baseURL,
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
  });

  return data;
};
