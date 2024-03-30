export const useVideoStream = () => {
  const videoStreamStore = useVideoStreamStore();
  const {
    stream,
    isStreaming,
    cameraPermission,
    videoDevices,
    currentVideoDevice,
  } = storeToRefs(videoStreamStore);

  const { isFaceMeshActive } = useFaceMesh();

  const permission = usePermission('camera');

  const { videoInputs: cameras } = useDevicesList({
    requestPermissions: true,
    onUpdated() {
      videoDevices.value = cameras.value;
      cameraPermission.value = permission.value!;
      if (!currentVideoDevice.value) {
        currentVideoDevice.value = cameras.value.at(0)!;
      }
    },
  });

  const handleIsStreamingToggle = () => {
    if (isStreaming.value && !isFaceMeshActive.value) {
      isFaceMeshActive.value = true;
    }
    isStreaming.value = !isStreaming.value;
  };

  return {
    stream,
    isStreaming,
    cameraPermission,
    videoDevices,
    currentVideoDevice,
    handleIsStreamingToggle,
  };
};
