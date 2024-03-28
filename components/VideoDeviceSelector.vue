<template>
  <p class="text-2xl font-bold tracking-tight">Selección de Cámara</p>
  <UDivider class="py-2" />
  <div>
    <div class="flex items-center gap-2 pt-1">
      <UIcon
        :name="cameraAccessIcon.name"
        class="text-green-500"
        :class="cameraAccessIcon.color"
      />
      <p class="text-sm text-gray-500">Permiso para el uso de cámara</p>
    </div>
    <div class="flex items-center gap-2 pt-1">
      <UIcon :name="cameraStatusIcon.name" :class="cameraStatusIcon.color" />
      <p class="text-sm text-gray-500">Estado de la cámara</p>
    </div>
  </div>
  <UDivider class="py-4" />
  <div class="grid grid-cols-4 gap-2">
    <USelect
      class="col-span-3"
      v-model="currentCamera"
      :options="cameras"
      :disabled="enabled"
      value-attribute="deviceId"
      icon="i-material-symbols-video-camera-front-outline-rounded"
      size="md"
      placeholder="Selecciona una cámara"
    />
    <UButton
      color="primary"
      variant="ghost"
      block
      :label="enabled ? 'Apagar' : 'Encender'"
      @click="enabled = !enabled"
    />
  </div>
  <video autoplay ref="videoComponent" class="h-100 w-auto" />
</template>

<script setup lang="ts">
  const currentCamera = ref();
  const videoComponent = ref();

  const cameraAccess = usePermission('camera');
  const { stream, enabled } = useUserMedia({
    constraints: {
      video: { deviceId: currentCamera.value },
    },
    autoSwitch: true,
  });

  const cameraAccessIcon = computed(() => {
    return {
      name: [
        cameraAccess.value === 'granted'
          ? 'i-material-symbols-check-circle-outline'
          : 'i-material-symbols-error-circle-rounded-outline-sharp',
      ],
      color: [
        cameraAccess.value === 'granted' ? 'text-green-500' : 'text-red-500',
      ],
    };
  });

  const cameraStatusIcon = computed(() => {
    return {
      name: [
        enabled.value
          ? 'i-material-symbols-video-camera-front-outline-rounded'
          : 'i-material-symbols-video-camera-front-off-outline-rounded',
      ],
      color: [enabled.value === true ? 'text-green-500' : 'text-red-500'],
    };
  });

  const { videoInputs: cameras } = useDevicesList({
    requestPermissions: true,
    onUpdated() {
      if (!cameras.value.find((i) => i.deviceId === currentCamera.value)) {
        currentCamera.value = cameras.value.at(0)?.deviceId;
      }
    },
  });

  watchEffect(() => {
    if (videoComponent.value) videoComponent.value.srcObject = stream.value!;
  });
</script>

<style scoped></style>
