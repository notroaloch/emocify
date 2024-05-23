export const useFaceMesh = () => {
  const faceMeshStore = useFaceMeshStore();
  const { faceMesh } = storeToRefs(faceMeshStore);

  return {
    faceMesh,
  };
};
