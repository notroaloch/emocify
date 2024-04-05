import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const moodID = getRouterParam(event, 'id');

  if (!moodID) {
    throw createError({
      statusCode: 400,
      statusMessage: '[E400-RP] - Missing route param: moodID',
    });
  }

  const supabase = await serverSupabaseClient<Database>(event);
  const { error } = await supabase.from('moods').delete().eq('id', moodID);

  if (error) {
    throw createError({
      statusCode: 500,
    });
  }

  return true;
});
