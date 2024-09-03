<template>
  <div class="mb-24 mt-2">
    <p class="text-2xl font-bold tracking-tight">FaceScan</p>
    <div class="mt-4 flex flex-col gap-8">
      <!-- VIDEO SELECTOR -->
      <div class="flex flex-col gap-2">
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
            <USelectMenu
              size="md"
              class="col-span-3"
              placeholder="Selecciona una cámara"
              v-model="currentVideoDevice"
              by="deviceId"
              :options="videoDevices"
              :disabled="isStreaming || cameraPermission !== 'granted'"
            />
            <UButton
              block
              class="transition-all"
              color="primary"
              variant="solid"
              :disabled="cameraPermission !== 'granted' || !currentVideoDevice"
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
        class="relative mx-auto w-full overflow-clip rounded-xl shadow-xl md:w-2/3"
      >
        <!-- VIDEO -->
        <video
          muted
          playsinline
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
            :name="isFaceMeshActive ? 'ph:pause' : 'ph:play'"
            class="h-6 w-6 cursor-pointer text-white transition-transform hover:scale-110 hover:animate-none"
            :class="{ 'animate-pulse': isFaceMeshActive }"
            @click="handleFaceMeshToggle"
          />
          <!-- SCAN FACEMESH BUTTON -->
          <UIcon
            name="i-streamline-face-scan-1"
            class="h-6 w-6 cursor-pointer text-white transition-transform hover:scale-110"
            :class="{
              hidden: isFaceMeshActive || results.faceLandmarks.length === 0,
            }"
            @click="handleFaceMeshScan"
          />
        </div>
      </div>
      <!-- MODAL RESULTS CARD -->
      <UModal v-model="isResultsModalOpen" prevent-close>
        <FaceScanResultsCard
          v-model="isResultsModalOpen"
          @on-modal-close="handleModalClose"
        />
      </UModal>
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
  const currentVideoDevice: Ref<MediaDeviceInfo> =
    useState('currentVideoDevice');

  const currentVideoDeviceID = computed(() => {
    if (currentVideoDevice.value) {
      return currentVideoDevice.value.deviceId;
    }
    return undefined;
  });

  const { videoInputs: videoDevices } = useDevicesList({
    requestPermissions: true,
    onUpdated() {
      if (!currentVideoDevice.value) {
        currentVideoDevice.value = videoDevices.value.at(0)!;
      }
    },
  });

  // FIXME: USING STRING WORKS, USING OBJECT.STRING THROWS UNDEFINED IDK WHY
  // SELECT CAMERA DOESNT WORK REALLY, IT TAKES THE FIRST CAMERA TO REGISTER
  // SOMETIMES IS ONE AND SOMETIMES IS ANOTHER (MAC/IPHONE)

  const { stream, enabled: isStreaming } = useUserMedia({
    constraints: {
      video: {
        deviceId: currentVideoDeviceID.value,
      },
    },
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
    faceMesh.value = undefined;
  };

  // MEDIAPIPE FACE MESH RELATED

  import {
    FilesetResolver,
    FaceLandmarker,
    DrawingUtils,
  } from '@mediapipe/tasks-vision';

  const { faceMesh } = useFaceMesh();
  const { currentMood, newMoodFromFaceMesh } = useMood();
  const isFaceMeshActive = useState('isFaceMeshActive', () => true);
  const isLoadingClassifier = useState('isLoadingClassifier', () => false);
  const isResultsModalOpen = useState('isResultsModalOpen', () => false);
  const canvasCtx: any = useState('canvasCtx');
  const lastVideoTime: Ref<number> = useState('lastVideoTime', () => -1);
  const results: any = useState('results');
  const drawingUtils: any = useState('drawingUtils');

  const handleFaceMeshToggle = () => {
    if (!isFaceMeshActive.value) {
      faceMesh.value = undefined;
    }

    isFaceMeshActive.value = !isFaceMeshActive.value;
    predictWebcam();
  };

  const handleFaceMeshScan = async () => {
    currentMood.value = undefined;
    isLoadingClassifier.value = true;
    isFaceMeshActive.value = false;
    isResultsModalOpen.value = true;

    faceMesh.value = results.value;
    await newMoodFromFaceMesh(faceMesh.value!);
  };

  const handleModalClose = () => {
    isLoadingClassifier.value = false;
    currentMood.value = undefined;
    isFaceMeshActive.value = true;
    isResultsModalOpen.value = false;
    faceMesh.value = undefined;
    predictWebcam();
  };

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
        name = 'ph:x-circle';
        color = 'text-red-500';
        break;
      case 'prompt':
        text = 'Autoriza el uso de cámara';
        name = 'ph:warning-circle';
        color = 'text-gray-500';
        break;
      case 'granted':
        text = 'Uso de cámara autorizado';
        name = 'ph:check-circle';
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
    const name = isStreaming.value
      ? 'ph:video-camera'
      : 'ph:video-camera-slash';

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
