import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import type { Database } from '~/utils/database.types';

export default defineEventHandler(async (event) => {
  const moodID = getRouterParam(event, 'id');
  const supabase = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);

  const { data, error } = await supabase
    .from('moods')
    .select('*')
    .eq('userID', user?.id!)
    .eq('id', moodID!);

  if (error) {
    throw createError({
      statusCode: 500,
    });
  }

  const mood: Mood[] = data.map((e) => {
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

  return mood.at(0);
});
