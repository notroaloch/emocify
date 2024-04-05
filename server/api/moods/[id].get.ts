import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import type { Database } from '~/utils/database.types';

export default defineEventHandler(async (event) => {
  const moodID = getRouterParam(event, 'id');

  if (!moodID) {
    throw createError({
      statusCode: 400,
      statusMessage: '[E400-RP] - Missing route param: moodID',
    });
  }

  const user = await serverSupabaseUser(event);
  const supabase = await serverSupabaseClient<Database>(event);

  if (!user) {
    throw createError({
      statusCode: 500,
    });
  }

  const { data, error } = await supabase
    .from('moods')
    .select('*')
    .eq('id', moodID);

  if (error) {
    throw createError({
      statusCode: 500,
    });
  }

  const mood = data
    .map((mood) => {
      return <Mood>{ ...mood };
    })
    .at(0);

  return mood;
});
