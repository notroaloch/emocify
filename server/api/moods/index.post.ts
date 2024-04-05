import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const { mood }: { mood: Mood } = await readBody(event);

  if (!mood) {
    throw createError({
      statusCode: 400,
      statusMessage: '[E400-MB] - Missing body: mood',
    });
  }

  const supabase = await serverSupabaseClient<Database>(event);
  const { data, error } = await supabase.from('moods').insert(mood).select();

  if (error) {
    throw createError({
      statusCode: 500,
    });
  }

  const insertedMood = data
    .map((mood) => {
      return <Mood>{ ...mood };
    })
    .at(0);

  return insertedMood;
});
