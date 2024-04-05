import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const moodID = getRouterParam(event, 'id');
  const { mood, playlist }: { mood: Mood; playlist: Playlist } =
    await readBody(event);

  if (!moodID) {
    throw createError({
      statusCode: 400,
      statusMessage: '[E400-RP] - Missing route param: moodID',
    });
  }

  if (!mood || !playlist) {
    throw createError({
      statusCode: 400,
      statusMessage: '[E400-MB] - Missing body: mood, playlist',
    });
  }

  if (moodID !== mood.id) {
    throw createError({
      statusCode: 400,
      statusMessage: '[E400-ME] - Mismatch Error: ID do not correspond to mood',
    });
  }

  const supabase = await serverSupabaseClient<Database>(event);
  const { data, error } = await supabase
    .from('moods')
    .update({
      linkedPlaylist: playlist.id,
    })
    .eq('id', moodID)
    .select();

  if (error) {
    throw createError({
      statusCode: 500,
    });
  }

  const updatedMood = data.at(0);
  return updatedMood;
});
