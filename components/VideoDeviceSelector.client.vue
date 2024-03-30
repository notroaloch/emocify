<template>
  <ClientOnly>
    <div
      v-show="enabled"
      class="flex flex-col overflow-clip rounded-xl shadow-xl md:w-1/2"
    >
      <div class="relative w-full">
        <video
          autoplay
          ref="videoComponent"
          @loadeddata="predictWebcam"
          class="w-full transition-all duration-700"
          :class="{ 'blur-md': !isFaceMeshActive }"
        />
        <canvas ref="videoCanvas" class="absolute left-0 top-0 h-full w-full" />
        <div
          class="absolute bottom-0 left-0 mb-4 flex w-full justify-center gap-8"
        >
          <div>
            <UIcon
              :name="
                isFaceMeshActive
                  ? 'i-streamline-entertainment-control-button-pause-2-button-television-buttons-movies-tv-pause-video-controls'
                  : 'i-streamline-entertainment-control-button-play-button-television-buttons-movies-play-tv-video-controls'
              "
              class="h-[25px] w-[25px] cursor-pointer text-white transition-transform hover:scale-110"
              @click="
                () => {
                  isFaceMeshActive = !isFaceMeshActive;
                  predictWebcam();
                }
              "
            />
          </div>
          <div>
            <UIcon
              name="i-streamline-face-scan-1"
              class="h-[25px] w-[25px] cursor-pointer text-white transition-transform hover:scale-110"
              :class="{
                hidden: isFaceMeshActive || results.faceLandmarks.length === 0,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  const currentCamera = ref();
  const videoComponent = ref();
  const isFaceMeshActive = ref(true);

  const cameraAccess = usePermission('camera');

  const { videoInputs: cameras } = useDevicesList({
    requestPermissions: true,
    onUpdated() {
      if (!cameras.value.find((i) => i.deviceId === currentCamera.value)) {
        currentCamera.value = cameras.value.at(0)?.deviceId;
      }
    },
  });

  const { stream, enabled } = useUserMedia({
    constraints: {
      video: { deviceId: currentCamera.value },
    },
    autoSwitch: true,
  });

  const cameraAccessIcon = computed(() => {
    return cameraAccess.value === 'granted'
      ? 'i-material-symbols-check-circle-outline'
      : 'i-material-symbols-error-circle-rounded-outline-sharp';
  });

  const cameraAccessIconColor = computed(() => {
    return cameraAccess.value === 'granted' ? 'text-green-500' : 'text-red-500';
  });

  const cameraStatusIcon = computed(() => {
    return enabled.value
      ? 'i-material-symbols-video-camera-front-outline-rounded'
      : 'i-material-symbols-video-camera-front-off-outline-rounded';
  });

  const cameraStatusIconColor = computed(() => {
    return enabled.value === true ? 'text-green-500' : 'text-red-500';
  });

  watchEffect(() => {
    if (videoComponent.value) videoComponent.value.srcObject = stream.value!;
  });

  // MEDIAPIPE PLAYGROUND
  import {
    FilesetResolver,
    FaceLandmarker,
    DrawingUtils,
  } from '@mediapipe/tasks-vision';

  const videoCanvas = ref();
  const canvasCtx = ref();
  const lastVideoTime = ref(-1);
  const results: any = ref(undefined);
  const drawingUtils: any = ref();

  onMounted(async () => {
    await nextTick();
    canvasCtx.value = videoCanvas.value.getContext('2d');
    drawingUtils.value = new DrawingUtils(canvasCtx.value);
  });

  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
  );

  const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: '/models/face_landmarker.task',
      delegate: 'GPU',
    },
    runningMode: 'VIDEO',
    outputFaceBlendshapes: true,
    outputFacialTransformationMatrixes: true,
  });

  const resetCanvas = () => {
    videoCanvas.value.width = videoComponent.value.videoWidth;
    videoCanvas.value.height = videoComponent.value.videoHeight;

    canvasCtx.value.clearRect(
      0,
      0,
      videoCanvas.value.width,
      videoCanvas.value.height
    );
  };

  const predictWebcam = async () => {
    if (isFaceMeshActive.value) {
      let startTimeMs = performance.now();
      if (lastVideoTime.value !== videoComponent.value.currentTime) {
        lastVideoTime.value = videoComponent.value.currentTime;
        results.value = faceLandmarker.detectForVideo(
          videoComponent.value,
          startTimeMs
        );
      }

      if (results.value.faceLandmarks) {
        resetCanvas();
        for (const landmarks of results.value.faceLandmarks) {
          drawingUtils.value.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_TESSELATION,
            { color: '#FFFFFF50', lineWidth: 0.5 }
          );
          drawingUtils.value.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
            { color: '#FFFFFF' }
          );
          drawingUtils.value.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
            { color: '#FFFFFF' }
          );
          drawingUtils.value.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
            { color: '#FFFFFF' }
          );
          drawingUtils.value.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
            { color: '#FFFFFF' }
          );
          drawingUtils.value.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
            { color: '#FFFFFF' }
          );
          drawingUtils.value.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_LIPS,
            { color: '#FFFFFF' }
          );
          drawingUtils.value.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
            { color: '#FFFFFF', lineWidth: 0.5 }
          );
          drawingUtils.value.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
            { color: '#FFFFFF', lineWidth: 0.5 }
          );
        }
      } else {
        results.value = undefined;
      }

      if (enabled.value) {
        requestAnimationFrame(predictWebcam);
      }
    }
  };
</script>

<style scoped></style>
