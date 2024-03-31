import type { FaceLandmarkerResult } from '@mediapipe/tasks-vision';

export const useFaceMeshStore = defineStore('faceMeshStore', () => {
  const faceLandmarkerResult: Ref<FaceLandmarkerResult | undefined> = useState(
    'faceLandmarkerResult'
  );

  return { faceLandmarkerResult };
});
