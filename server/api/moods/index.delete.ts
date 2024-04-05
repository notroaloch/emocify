import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const { ids }: { ids: string[] } = getQuery(event);

  if (!ids || ids.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: '[E400-RP] - Missing route param: moodID',
    });
  }

  console.log('delete bulk', ids);

  const supabase = await serverSupabaseClient<Database>(event);
  const { error } = await supabase.from('moods').delete().in('id', ids);

  if (error) {
    throw createError({
      statusCode: 500,
    });
  }

  return true;
});
