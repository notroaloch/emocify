// import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

// export default defineEventHandler(async (event) => {
//   const authToken = getCookie(event, 'oauth_provider_token');
//   const supabase = await serverSupabaseClient<Database>(event);
//   const supaUser = await serverSupabaseUser(event);
//   const spotifyUserID = supaUser?.identities?.at(0)?.id;

//   const { mood, artists }: { mood: Mood; artists: Artist[] } =
//     await readBody(event);

//   if (!authToken) {
//     throw createError({
//       statusCode: 400,
//       statusMessage:
//         '[E400-MC] - Missing cookie: oauth_provider_token (spotify auth token) ',
//     });
//   }

//   if (!mood) {
//     throw createError({
//       statusCode: 400,
//       statusMessage: '[E400-MB] - Missing body: mood',
//     });
//   }

//   if (!artists) {
//     throw createError({
//       statusCode: 400,
//       statusMessage: '[E400-MB] - Missing body: artists',
//     });
//   }

//   // GET USERS TOP ARTISTS (FOLLOWED/TOP) UNIQUE
//   const artistIDS: string[] = [];
//   const artistUnique: Artist[] = [];
//   const allArtists: Artist[] = artists.flat();

//   allArtists.flat().forEach((artist) => {
//     if (!artistIDS.includes(artist.id)) {
//       artistIDS.push(artist.id);
//       artistUnique.push(artist);
//       return;
//     }
//   });

//   // GET TOP TRACKS OF TOP ARTISTS
//   const responsesTopTracks = await Promise.all(
//     artistUnique.map((artist: Artist) => {
//       return getArtistTopTracks(authToken, artist);
//     })
//   );
//   const topTracks = responsesTopTracks.flat();

//   // GET AUDIO FEATURES FOR TRACKS (LIMITED TO 100 TRACKS PER REQUEST)
//   const tracksPerChunk = 100;
//   const chunks = topTracks.reduce((resultArray, item, index) => {
//     const chunkIndex = Math.floor(index / tracksPerChunk);
//     if (!resultArray[chunkIndex]) {
//       resultArray[chunkIndex] = []; // START A NEW CHUNK
//     }
//     resultArray[chunkIndex].push(item);
//     return resultArray;
//   }, []);

//   const responsesAudioFeatures = await Promise.all(
//     chunks.map((chunk: Track[]) => {
//       return getSeveralTracksAudioFeatures(authToken, chunk);
//     })
//   );
//   const audioFeatures = responsesAudioFeatures.flat();

//   // CLASSIFY TRACKS BY AUDIO FEATURES
//   let classifiedTrackURIS = classifyAudioFeaturesByEmotion(
//     mood.emotion,
//     audioFeatures
//   );

//   // TODO: FILL WITH SPOTIFY RECOMMENDATIONS IF FILTERED TRACKS IS 0 OR LESS THAN 20

//   if (classifiedTrackURIS.length >= 20) {
//     classifiedTrackURIS = classifiedTrackURIS.sort(() => Math.random() - 0.5);
//     classifiedTrackURIS = classifiedTrackURIS.slice(0, 20);
//   }

//   // CREATE PLAYLIST
//   const playlistName =
//     'emocify-' + mood.emotion + '-' + mood.id?.split('-').at(0);
//   const playlistID = await createPlaylist(
//     authToken,
//     spotifyUserID!,
//     playlistName
//   );

//   // ADD TRACKS TO PLAYLIST
//   await addTracksToPlaylist(authToken, playlistID, classifiedTrackURIS);

//   // GET FULL PLAYLIST DATA
//   const playlist: Playlist = await getPlaylist(authToken, playlistID);

//   const p = {
//     id: playlist.id,
//     url: playlist.href,
//     moodID: mood.id,
//   };

//   // INSERT PLAYLIST IN DB
//   const { error: inserError } = await supabase.from('playlists').insert(p);

//   // UPDATE MOOD WITH LINKED PLAYLIST
//   const { data: updatedMood, error: updateError } = await supabase
//     .from('moods')
//     .update({ linkedPlaylist: playlist.id })
//     .eq('id', mood.id!)
//     .select();

//   return playlist;
// });
