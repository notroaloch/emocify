<template>
  <div class="flex flex-col gap-4">
    <canvas ref="canvas" width="1920px" height="1080px"></canvas>
    <UDivider />
    <div class="flex justify-evenly">
      <p class="text-center text-2xl font-semibold tracking-tight">
        {{ mood.emotion }}
      </p>
      <p class="text-center text-2xl font-semibold tracking-tight">
        {{ mood.classifierModel }}
      </p>
      <p class="text-center text-2xl font-semibold tracking-tight">
        {{ createdAt }}
      </p>
    </div>
    <UDivider />
    <iframe
      v-if="mood.linkedPlaylist"
      allow="encrypted-media"
      v-show="mood.linkedPlaylist"
      class="h-[50vh] w-full rounded-xl lg:col-span-3"
      :src="iFrameURL"
      frameborder="0"
    />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    mood: Mood;
  }>();

  const { mood } = toRefs(props);
  const createdAt = computed(() => getFormattedDate(mood.value.createdAt!));
  const iFrameURL = computed(() => {
    return `https://open.spotify.com/embed/playlist/${mood.value.linkedPlaylist}?utm_source=oembed`;
  });

  import { FaceLandmarker, DrawingUtils } from '@mediapipe/tasks-vision';

  const canvas = ref();
  const canvasCtx: any = useState('canvasCtx');
  const drawingUtils: any = useState('drawingUtils');

  onMounted(async () => {
    await nextTick();
    canvasCtx.value = canvas.value.getContext('2d');
    drawingUtils.value = new DrawingUtils(canvasCtx.value);
  });

  const landmarks = mood.value.faceLandmarks;

  watch(drawingUtils, () => {
    drawingUtils.value.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_TESSELATION,
      { color: '#93c5fd', lineWidth: 0.5 }
    );
    drawingUtils.value.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
      { color: '#3b82f6' }
    );
    drawingUtils.value.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
      { color: '#3b82f6' }
    );
    drawingUtils.value.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
      { color: '#3b82f6' }
    );
    drawingUtils.value.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
      { color: '#3b82f6' }
    );
    drawingUtils.value.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
      { color: '#3b82f6' }
    );
    drawingUtils.value.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_LIPS,
      { color: '#3b82f6' }
    );
    drawingUtils.value.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
      { color: '#3b82f6', lineWidth: 0.5 }
    );
    drawingUtils.value.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
      { color: '#3b82f6', lineWidth: 0.5 }
    );
  });
</script>

<style scoped></style>
