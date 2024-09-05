import { serverSupabaseSession } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const {
    name,
    description,
    artists,
    mood,
  }: { name: string; description: string; artists: Artist[]; mood: Mood } =
    await readBody(event);

  const authToken = getCookie(event, 'oauth_provider_token');
  const sbAuthToken = getCookie(event, 'sb-access-token');
  const sbRefreshToken = getCookie(event, 'sb-refresh-token');

  if (!authToken) {
    throw createError({
      statusCode: 401,
      statusMessage: '[E401-MC] - Missing cookie: oauth_provider_token',
    });
  }

  if (!name || !description || !artists || !mood) {
    throw createError({
      statusCode: 400,
      statusMessage:
        '[E400-MB] - Missing body: name, description, artists, mood',
    });
  }

  // IMPORTANT TO SET COOKIES TO RE-REDIRECT INTERNAL API CALLS
  const headers = new Headers();
  headers.set(
    'Cookie',
    `oauth_provider_token=${authToken}; sb-access-token=${sbAuthToken}; sb-refresh-token=${sbRefreshToken}`
  );

  // GET TOP TRACKS OF ARTISTS
  const topTracks: Track[] = await Promise.all(
    artists.map((artist) => {
      return getArtistTopTracks(authToken, artist);
    })
  ).then((responses) => responses.flat());

  // GET AUDIO FEATURES FOR TRACKS (100 PER REQUEST)
  const tracksPerChunk = 100;
  // SPLIT ALL TRACKS INTO CHUNKS OF 100 TRACKS
  const chunks = topTracks.reduce((resultArray: any, item: any, index: any) => {
    const chunkIndex = Math.floor(index / tracksPerChunk);
    if (!resultArray[chunkIndex]) resultArray[chunkIndex] = [];
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  const audioFeatures: AudioFeatures[] = await Promise.all(
    chunks.map((chunk: Track[]) => {
      return getSeveralTracksAudioFeatures(authToken, chunk);
    })
  ).then((responses) => responses.flat());

  // FILTER TRACKS AUDIO FEATURES BY MOOD AND RETURN URIS
  let filteredTrackURIS: string[] = classifyAudioFeaturesByEmotion(
    mood.emotion,
    audioFeatures
  );

  // SHUFFLE TRACKS AND ONLY GET N TRACKS
  const trackURIS: string[] = shuffleAndSlice(filteredTrackURIS);

  // CREATE PLAYLIST
  const playlist = await $fetch('/api/spotify/user/playlists', {
    method: 'POST',
    headers,
    body: {
      name,
      description,
    },
  });

  // ADD TRACKS TO PLAYLIST
  await $fetch('/api/spotify/user/playlists', {
    method: 'PUT',
    headers,
    query: {
      id: playlist.id,
    },
    body: {
      uris: trackURIS,
    },
  });

  const supabase = await serverSupabaseClient<Database>(event);

  // INSERT PLAYLIST IN DATABASE
  const { error: insertPlaylistError } = await supabase
    .from('playlists')
    .insert({ id: playlist.id, url: playlist.href, moodID: mood.id! });

  if (insertPlaylistError) {
    throw createError({
      statusCode: 500,
    });
  }

  // UPDATE MOOD LINKED PLAYLIST
  const updatedMood = await $fetch(`/api/moods/${mood.id}`, {
    method: 'PUT',
    headers,
    body: {
      mood,
      playlist,
    },
  });

  return { mood: updatedMood, playlist };
});
