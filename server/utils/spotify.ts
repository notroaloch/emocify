export const getArtistTopTracks = async (authToken: string, artist: Artist) => {
  const { tracks } = await spotifyApi<ArtistTopTracksResponse>(
    `/artists/${artist.id}/top-tracks`,
    {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    }
  );

  return tracks;
};

export const getSeveralTracksAudioFeatures = async (
  authToken: string,
  tracks: Track[]
) => {
  const ids = tracks.map((track: Track) => track.id).join(',');

  const { audio_features } = await spotifyApi<TracksAudioFeaturesResponse>(
    '/audio-features',
    {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
      query: {
        ids,
      },
    }
  );

  return audio_features;
};

export const classifyAudioFeaturesByEmotion = (
  emotion: string,
  audioFeatures: AudioFeatures[]
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

export const shuffleAndSlice = (filteredTrackURIS: string[]) => {
  let shuffledAndSliced: string[] = [];

  if (filteredTrackURIS.length >= 20) {
    filteredTrackURIS = filteredTrackURIS.sort(() => Math.random() - 0.5);
    shuffledAndSliced = filteredTrackURIS.slice(0, 20);
  } else {
    shuffledAndSliced = filteredTrackURIS;
  }

  return shuffledAndSliced;
};
