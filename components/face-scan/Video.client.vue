<template>
  <div class="my-8">
    <p class="text-2xl font-bold tracking-tight">FaceScan</p>
    <div class="mt-4 flex flex-col gap-8">
      <!-- VIDEO SELECTOR -->
      <div class="flex flex-col gap-2 md:w-1/2">
        <UDivider />
        <div class="flex flex-col gap-2">
          <!-- CAMERA INFO -->
          <div>
            <!-- PERMISSION -->
            <div class="flex items-center gap-2">
              <UIcon
                :name="cameraPermissionStyles.icon.name"
                :class="cameraPermissionStyles.icon.color"
              />
              <p class="text-sm text-gray-500">
                {{ cameraPermissionStyles.text }}
              </p>
            </div>
            <!-- STATUS -->
            <div class="flex items-center gap-2 pt-1">
              <UIcon
                :name="cameraStatusStyles.icon.name"
                :class="cameraStatusStyles.icon.color"
              />
              <p class="text-sm text-gray-500">{{ cameraStatusStyles.text }}</p>
            </div>
          </div>
          <!-- CAMERA SELECTOR AND ENABLE/DISABLE BUTTON -->
          <div class="grid grid-cols-4 gap-2">
            <USelect
              size="md"
              class="col-span-3"
              placeholder="Selecciona una cámara"
              icon="i-material-symbols-video-camera-front-outline-rounded"
              v-model="currentVideoDeviceID"
              value-attribute="deviceId"
              :options="videoDevices"
              :disabled="isStreaming || cameraPermission !== 'granted'"
            />
            <UButton
              block
              class="transition-all"
              color="primary"
              variant="solid"
              :disabled="
                cameraPermission !== 'granted' || !currentVideoDeviceID
              "
              :label="isStreaming ? 'Apagar' : 'Encender'"
              @click="handleStreamingToggle"
            />
          </div>
        </div>
        <UDivider class="mt-2" />
      </div>
      <!-- VIDEO PREVIEW -->
      <div
        v-show="isStreaming"
        class="relative w-full overflow-clip rounded-xl shadow-xl md:w-1/2"
      >
        <!-- VIDEO -->
        <video
          autoplay
          ref="video"
          @loadeddata="predictWebcam"
          class="w-full transition-all duration-700"
          :class="{ 'blur-md': !isFaceMeshActive }"
        />
        <!-- CANVAS -->
        <canvas ref="canvas" class="absolute left-0 top-0 w-full" />
        <!-- CONTROLS OVERLAY -->
        <div
          class="absolute bottom-0 left-0 mb-4 flex w-full justify-center gap-6"
        >
          <!-- PLAY/PAUSE BUTTON -->
          <UIcon
            :name="
              isFaceMeshActive
                ? 'i-streamline-entertainment-control-button-pause-2-button-television-buttons-movies-tv-pause-video-controls'
                : 'i-streamline-entertainment-control-button-play-button-television-buttons-movies-play-tv-video-controls'
            "
            class="h-6 w-6 cursor-pointer text-white transition-transform hover:scale-110 hover:animate-none"
            :class="{ 'animate-pulse': isFaceMeshActive }"
            @click="handleFaceMeshToggle"
          />
          <!-- SCAN FACEMESH BUTTON -->
          <!-- TODO: HANDLE CLICK  -->
          <UIcon
            name="i-streamline-face-scan-1"
            class="h-6 w-6 cursor-pointer text-white transition-transform hover:scale-110"
            :class="{
              hidden: isFaceMeshActive || results.faceLandmarks.length === 0,
            }"
            @click=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // FIXME: I NEED TO KEEP ALL THE LOGIC INSIDE HERE
  // BECAUSE I CANT MAKE IT WORK IN COMPOSABLES NOR SEPARATE COMPONENTS WITH PROPS
  // UNDEFINED ERRORS WHEN CREATING STREAM ETC

  // HTML COMPONENT TEMPLATE REFS
  const video = ref();
  const canvas = ref();

  // VIDEO FEED RELATED
  const cameraPermission = usePermission('camera');
  const currentVideoDeviceID = useState('currentVideoDeviceID');

  const { videoInputs: videoDevices } = useDevicesList({
    requestPermissions: true,
    onUpdated() {
      if (!currentVideoDeviceID.value) {
        currentVideoDeviceID.value = videoDevices.value.at(0)?.deviceId;
      }
    },
  });

  // FIXME: USING STRING WORKS, USING OBJECT.STRING THROWS UNDEFINED IDK WHY
  // SELECT CAMERA DOESNT WORK REALLY, IT TAKES THE FIRST CAMERA TO REGISTER
  // SOMETIMES IS ONE AND SOMETIMES IS ANOTHER (MAC/IPHONE)

  const { stream, enabled: isStreaming } = useUserMedia({
    constraints: {
      video: {
        deviceId: currentVideoDeviceID.value!,
      },
    },
    autoSwitch: true,
  });

  watchEffect(() => {
    if (video.value) {
      video.value.srcObject = stream.value;
    }
  });

  const handleStreamingToggle = () => {
    if (isStreaming.value && !isFaceMeshActive.value) {
      isFaceMeshActive.value = true;
    }
    isStreaming.value = !isStreaming.value;
  };

  // MEDIAPIPE FACE MESH RELATED
  const isFaceMeshActive = useState('isFaceMeshActive', () => true);

  const handleFaceMeshToggle = () => {
    isFaceMeshActive.value = !isFaceMeshActive.value;
    predictWebcam();
  };

  import {
    FilesetResolver,
    FaceLandmarker,
    DrawingUtils,
  } from '@mediapipe/tasks-vision';

  const canvasCtx: any = useState('canvasCtx');
  const lastVideoTime: Ref<number> = useState('lastVideoTime', () => -1);
  const results: any = useState('faceMeshResults');
  const drawingUtils: any = useState('drawingUtils');

  onMounted(async () => {
    await nextTick();
    canvasCtx.value = canvas.value.getContext('2d');
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
    canvas.value.width = video.value.videoWidth;
    canvas.value.height = video.value.videoHeight;

    canvasCtx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  };

  const predictWebcam = async () => {
    if (isFaceMeshActive.value) {
      let startTimeMs = performance.now();
      if (lastVideoTime.value !== video.value.currentTime) {
        lastVideoTime.value = video.value.currentTime;
        results.value = faceLandmarker.detectForVideo(video.value, startTimeMs);
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

      if (isStreaming.value) {
        requestAnimationFrame(predictWebcam);
      }
    }
  };

  // COMPONENT STYLING RELATED
  const cameraPermissionStyles = computed(() => {
    let name, color, text;
    switch (cameraPermission.value) {
      case 'denied':
        text = 'Uso de cámara no autorizado';
        name = 'i-material-symbols-block';
        color = 'text-red-500';
        break;
      case 'prompt':
        text = 'Autoriza el uso de cámara';
        name = 'i-material-symbols-error-circle-rounded-outline-sharp';
        color = 'text-gray-500';
        break;
      case 'granted':
        text = 'Uso de cámara autorizado';
        name = 'i-material-symbols-check-circle-outline';
        color = 'text-green-500';
        break;
      default:
        break;
    }
    return {
      icon: { name, color },
      text,
    };
  });

  const cameraStatusStyles = computed(() => {
    const name = isStreaming
      ? 'i-material-symbols-video-camera-front-outline-rounded'
      : 'i-material-symbols-video-camera-front-off-outline-rounded';

    const color =
      isStreaming.value === true ? 'text-green-500' : 'text-red-500';

    const text = isStreaming.value ? 'Cámara encendida' : 'Cámara apagada';

    return {
      icon: { name, color },
      text,
    };
  });
</script>

<style scoped></style>
