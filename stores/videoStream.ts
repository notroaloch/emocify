export const useVideoStreamStore = defineStore('videoStreamStore', () => {
  const stream: Ref<MediaStream> | undefined = useState('stream');
  const isStreaming: Ref<boolean> = useState('isStreaming', () => false);

  const cameraPermission: Ref<PermissionState> | undefined =
    useState('cameraPermission');

  const videoDevices: Ref<MediaDeviceInfo[]> | undefined =
    useState('videoDevices');

  const currentVideoDevice: Ref<MediaDeviceInfo> | undefined =
    useState('currentVideoDevice');

  return {
    stream,
    isStreaming,
    cameraPermission,
    videoDevices,
    currentVideoDevice,
  };
});
