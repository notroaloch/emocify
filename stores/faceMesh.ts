import type { FaceLandmarkerResult } from '@mediapipe/tasks-vision';

export const useFaceMeshStore = defineStore('faceMeshStore', () => {
  const faceMesh: Ref<FaceLandmarkerResult | undefined> = useState(
    'faceMeshStore-faceMesh'
  );

  return { faceMesh };
});
