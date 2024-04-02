import type { FaceLandmarkerResult } from '@mediapipe/tasks-vision';

export const useFaceMeshStore = defineStore('faceMesh', () => {
  const faceMesh: Ref<FaceLandmarkerResult | undefined> =
    useState('faceMesh-faceMesh');

  return { faceMesh };
});
