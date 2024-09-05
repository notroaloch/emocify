export default defineEventHandler(async (event) => {
  const {
    seeds,
    audioFeatures,
  }: {
    seeds: { artist: string; track: string };
    audioFeatures: {
      valence: number[];
      energy: number[];
      danceability: number[];
    };
  } = await readBody(event);
  const authToken = getCookie(event, 'oauth_provider_token');

  if (!authToken) {
    throw createError({
      statusCode: 401,
      statusMessage: '[E401-MC] - Missing cookie: oauth_provider_token',
    });
  }

  const { tracks } = await spotifyApi('/recommendations', {
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
    query: {
      seed_artists: seeds.artist,
      seed_tracks: seeds.track,
      min_danceability: audioFeatures.danceability.at(0),
      max_danceability: audioFeatures.danceability.at(1),
      min_energy: audioFeatures.energy.at(0),
      max_energy: audioFeatures.energy.at(1),
      min_valence: audioFeatures.valence.at(0),
      max_valence: audioFeatures.valence.at(1),
    },
  });

  return tracks;
});
