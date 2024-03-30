export const useFaceMeshStore = defineStore('faceMeshStore', () => {
  const isFaceMeshActive: Ref<boolean> = useState(
    'isFaceMeshActive',
    () => false
  );

  return { isFaceMeshActive };
});
