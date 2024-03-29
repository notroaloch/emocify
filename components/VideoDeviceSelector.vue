<template>
  <p class="text-2xl font-bold tracking-tight">Selección de Cámara</p>
  <UDivider class="py-2" />
  <div>
    <div class="flex items-center gap-2 pt-1">
      <UIcon
        :name="cameraAccessIcon"
        class="text-green-500"
        :class="cameraAccessIconColor"
      />
      <p class="text-sm text-gray-500">Permiso para el uso de cámara</p>
    </div>
    <div class="flex items-center gap-2 pt-1">
      <UIcon :name="cameraStatusIcon" :class="cameraStatusIconColor" />
      <p class="text-sm text-gray-500">Estado de la cámara</p>
    </div>
  </div>
  <div class="mt-4 grid grid-cols-4 gap-2">
    <USelect
      class="col-span-3"
      v-model="currentCamera"
      :options="cameras"
      :disabled="enabled || cameraAccess !== 'granted'"
      value-attribute="deviceId"
      icon="i-material-symbols-video-camera-front-outline-rounded"
      size="md"
      placeholder="Selecciona una cámara"
    />
    <UButton
      class="transition-all"
      color="primary"
      variant="solid"
      block
      :disabled="cameraAccess !== 'granted'"
      :label="enabled ? 'Apagar' : 'Encender'"
      @click="enabled = !enabled"
    />
  </div>
  <UDivider class="py-4" />
  <div
    v-if="enabled"
    class="flex flex-col rounded-lg border dark:border-gray-800"
  >
    <div class="overflow-clip rounded-t-lg">
      <video
        autoplay
        ref="videoComponent"
        class="w-full transition-all duration-700 md:w-1/2"
        :class="{ 'blur-sm': !isFaceMeshActive }"
      />
    </div>
    <div
      class="grid w-full grid-cols-1"
      :class="{ 'grid-cols-2': !isFaceMeshActive }"
    >
      <UButton
        block
        color="primary"
        variant="ghost"
        size="xl"
        class="py-3 transition-all"
        :ui="{ rounded: 'rounded-none', color: { gray: { solid: 'ring-0' } } }"
        @click="isFaceMeshActive = !isFaceMeshActive"
      >
        {{
          isFaceMeshActive ? 'Pausar FaceMesh' : 'Reanudar FaceMesh'
        }}</UButton
      >
      <UButton
        :class="{ hidden: isFaceMeshActive }"
        block
        color="primary"
        variant="ghost"
        size="xl"
        class="py-3"
        :ui="{ rounded: 'rounded-none', color: { gray: { solid: 'ring-0' } } }"
      >
        Analizar Emoción
      </UButton>
    </div>
  </div>
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
</script>

<style scoped></style>
