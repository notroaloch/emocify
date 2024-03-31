export const useFaceMesh = () => {
  const faceMeshStore = useFaceMeshStore();
  const { faceLandmarkerResult } = storeToRefs(faceMeshStore);

  return { faceLandmarkerResult };
};
