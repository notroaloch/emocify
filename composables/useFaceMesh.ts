export const useFaceMesh = () => {
  const faceMeshStore = useFaceMeshStore();
  const { isFaceMeshActive } = storeToRefs(faceMeshStore);

  return { isFaceMeshActive };
};
