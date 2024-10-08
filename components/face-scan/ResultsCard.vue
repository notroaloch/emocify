<template>
  <UCard
    :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
  >
    <template #header>
      <div class="flex items-center">
        <p class="flex-1 text-xl tracking-tight">
          {{ currentMood ? 'Resultados' : '' }}
        </p>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="handleModalClose"
        />
      </div>
    </template>
    <div class="flex gap-8" v-if="currentMood">
      <div class="flex gap-4">
        <NuxtImg
          :src="imageURL"
          class="h-[100px] w-[100px] rounded-full shadow-md transition-all group-hover:scale-105 group-hover:shadow-lg group-hover:dark:shadow-gray-800"
        />
      </div>
      <div class="flex flex-col gap-4 border-l-2 pl-8 dark:border-gray-800">
        <div>
          <p class="text-sm uppercase tracking-tight text-gray-500">
            EMOCION DETECTADA
          </p>
          <p class="text-2xl font-bold">{{ currentMood?.emotion }}</p>
        </div>
        <div>
          <p class="text-sm uppercase tracking-tight text-gray-500">
            MODELO DE CLASIFICACIÓN
          </p>
          <p class="text-2xl font-bold">{{ currentMood?.classifierModel }}</p>
        </div>
        <UDivider />

        <div>
          <p class="text-xs uppercase tracking-tight text-gray-500">
            FECHA DE CREACION
          </p>
          <p class="text-xs text-gray-500">
            {{ getFormattedDate(currentMood?.createdAt!) }}
          </p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-tight text-gray-500">
            PLAYLIST VINCULADA
          </p>
          <p class="text-xs text-gray-500">
            {{ currentMood.linkedPlaylist ? currentMood.linkedPlaylist : 'NO' }}
          </p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-tight text-gray-500">
            IDENTIFICADOR
          </p>
          <p class="text-xs text-gray-500">{{ currentMood?.id }}</p>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center gap-6">
      <UIcon
        name="i-streamline-face-scan-1"
        class="text-primary h-[40px] w-[40px]"
      />
      <p class="animate-pulse text-center">Procesando FaceMesh</p>
    </div>
    <template #footer v-if="currentMood">
      <UButton
        block
        color="primary"
        variant="soft"
        :class="{ hidden: didCreatePlaylist }"
        :disabled="isLoading"
        @click="handleClick"
        >Generar Playlist</UButton
      >
      <UAlert
        v-if="didCreatePlaylist"
        title="¡Creación exitosa!"
        description="Se vinculó la playlist generada con el mood actual"
        color="green"
        variant="subtle"
      />
    </template>
  </UCard>
</template>

<script setup lang="ts">
  const emit = defineEmits(['onModalClose']);

  const { currentMood } = useMood();
  const { createMoodPlaylist } = useSpotifyStore();

  const isLoading: Ref<boolean> = useState('isLoading', () => false);
  const didCreatePlaylist: Ref<boolean> = useState('didCreatePlaylist');

  const handleClick = async () => {
    isLoading.value = true;

    console.log('handle click', currentMood.value);
    await createMoodPlaylist(currentMood.value!);

    didCreatePlaylist.value = true;
    isLoading.value = false;
  };

  const handleModalClose = () => {
    didCreatePlaylist.value = false;
    emit('onModalClose');
  };

  const imageURL = computed(() => {
    let url;

    switch (currentMood.value!.emotion.toUpperCase()) {
      case 'ANGRY':
        url = '/images/moods/angry.png';
        break;
      case 'SAD':
        url = '/images/moods/sad.png';
        break;
      case 'NEUTRAL':
        url = '/images/moods/neutral.png';
        break;
      case 'HAPPY':
        url = '/images/moods/happy.png';
        break;
      default:
        url = '/images/moods/no-mood.png';
        break;
    }

    return url;
  });
</script>

<style scoped></style>
