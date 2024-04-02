import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import type { Database } from '~/utils/database.types';

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);

  const { data, error } = await supabase
    .from('moods')
    .select('*')
    .eq('userID', user?.id!);

  if (error) {
    throw createError({
      statusCode: 500,
    });
  }

  const moods: Mood[] = data.map((e) => {
    return <Mood>{
      id: e.id,
      emotion: e.emotion,
      linkedPlaylist: e.linkedPlaylist,
      faceLandmarks: e.faceLandmarks,
      faceBlendshapes: e.faceBlendshapes,
      faceMatrix: e.faceMatrix,
      createdAt: e.createdAt,
      userID: e.userID,
      classifierModel: e.classifierModel,
    };
  });

  return moods;
});
