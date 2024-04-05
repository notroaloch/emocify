import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import type { Database } from '~/utils/database.types';

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({
      statusCode: 500,
    });
  }

  const { data, error } = await supabase
    .from('moods')
    .select('*')
    .eq('userID', user.id)
    .order('createdAt', { ascending: false });

  if (error) {
    throw createError({
      statusCode: 500,
    });
  }

  const moods = data.map((mood) => {
    return <Mood>{ ...mood };
  });

  return moods;
});
