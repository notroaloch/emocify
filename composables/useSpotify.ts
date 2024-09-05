export const useSpotify = () => {
  const { topTracks, followedAndTopArtist } = storeToRefs(useSpotifyStore());

  const getRecommendationSeeds = () => {
    console.log('get recomendation', topTracks.value);
    console.log('get recomendation', followedAndTopArtist.value);

    const trackSeed = topTracks.value?.map((track) => track.id).at(0);
    const artistSeed = followedAndTopArtist.value
      ?.map((artist) => artist.id)
      .at(0);

    return { trackSeed, artistSeed };
  };

  const getAudioFeaturesConfig = (mood: Mood) => {
    const config = {
      ANGRY: {
        valence: [0, 0.4],
        energy: [0.5, 1],
        danceability: [0.3, 0.7],
      },
      SAD: {
        valence: [0, 0.4],
        energy: [0, 0.5],
        danceability: [0, 0.5],
      },
      NEUTRAL: {
        valence: [0.4, 0.6],
        energy: [0.4, 0.6],
        danceability: [0.4, 0.6],
      },
      HAPPY: {
        valence: [0.6, 1],
        energy: [0.5, 1],
        danceability: [0.5, 1],
      },
    };

    return config[mood.emotion] ? config[mood.emotion] : config.NEUTRAL;
  };

  const createMoodPlaylist = async (mood: Mood) => {
    // TODO: GET MOOD ACOUSTIC PARAMETERS
    const { getAudioFeaturesMoodConfig } = useMood();
    const { valence, energy, danceability } = getAudioFeaturesMoodConfig(mood);

    // TODO: CREATE SEED (5 TRACKS/ARTISTS)
    const { trackSeed, artistSeed } = getRecommendationSeeds();

    // TODO: CREATE PLAYLIST

    // TODO: ADD SONGS TO PLAYLIST
  };

  return {
    getRecommendationSeeds,
    getAudioFeaturesConfig,
  };
};
