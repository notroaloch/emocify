<template>
  <div class="flex flex-col gap-2">
    <!-- CAMERA PERMISSION AND STATUS -->
    <div>
      <div class="flex items-center gap-2">
        <UIcon
          :name="cameraPermissionIcon.name[0]"
          class="text-green-500"
          :class="cameraPermissionIcon.color[0]"
        />
        <p class="text-sm text-gray-500">Permiso para el uso de cámara</p>
      </div>
      <div class="flex items-center gap-2 pt-1">
        <UIcon
          :name="cameraStatusIcon.name[0]"
          :class="cameraStatusIcon.color[0]"
        />
        <p class="text-sm text-gray-500">Estado de la cámara</p>
      </div>
    </div>
    <!-- CAMERA SELECTOR AND ENABLE/DISABLE BUTTON -->
    <div class="grid grid-cols-4 gap-2">
      <USelectMenu
        size="md"
        class="col-span-3"
        placeholder="Selecciona una cámara"
        icon="i-material-symbols-video-camera-front-outline-rounded"
        by="deviceId"
        v-model="currentVideoDevice"
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
        @click="handleIsStreamingToggle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const {
    isStreaming,
    cameraPermission,
    videoDevices,
    currentVideoDevice,
    handleIsStreamingToggle,
  } = useVideoStream();

  const cameraPermissionIcon = computed(() => {
    return {
      name: [
        cameraPermission.value === 'granted'
          ? 'i-material-symbols-check-circle-outline'
          : 'i-material-symbols-error-circle-rounded-outline-sharp',
      ],
      color: [
        cameraPermission.value === 'granted'
          ? 'text-green-500'
          : 'text-red-500',
      ],
    };
  });

  const cameraStatusIcon = computed(() => {
    return {
      name: [
        isStreaming.value
          ? 'i-material-symbols-video-camera-front-outline-rounded'
          : 'i-material-symbols-video-camera-front-off-outline-rounded',
      ],
      color: [isStreaming.value === true ? 'text-green-500' : 'text-red-500'],
    };
  });
</script>

<style scoped></style>
