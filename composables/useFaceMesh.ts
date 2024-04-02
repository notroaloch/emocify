import type { FaceLandmarkerResult } from '@mediapipe/tasks-vision';

export const useFaceMesh = () => {
  const faceMeshStore = useFaceMeshStore();
  const { faceMesh } = storeToRefs(faceMeshStore);

  return {
    faceMesh,
  };
};
