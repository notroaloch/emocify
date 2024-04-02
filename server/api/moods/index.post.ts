import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import type { FaceLandmarkerResult } from '@mediapipe/tasks-vision';
import type { Database } from '~/utils/database.types';

export default defineEventHandler(async (event) => {
  const {
    emotion,
    model,
    faceMesh,
  }: { emotion: string; model: string; faceMesh: FaceLandmarkerResult } =
    await readBody(event);

  const faceLandmarks = faceMesh.faceLandmarks.at(0);
  const faceBlendshapes = faceMesh.faceBlendshapes.at(0)?.categories;
  const faceMatrix = faceMesh.facialTransformationMatrixes.at(0)?.data;

  const supabase = await serverSupabaseClient<Database>(event);

  const m = {
    emotion,
    classifierModel: model,
    faceLandmarks: faceLandmarks as Array<FaceLandmark>,
    faceBlendshapes: faceBlendshapes as Array<FaceBlendshape>,
    faceMatrix: faceMatrix as Array<number>,
  };

  const { data, error } = await supabase.from('moods').insert(m).select();

  if (error) {
    throw createError({
      statusCode: 500,
    });
  }

  const mood = data?.at(0);
  return mood;
});
