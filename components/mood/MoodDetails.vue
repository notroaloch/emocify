<template>
  <div class="flex flex-col gap-3">
    <p>ID: {{ mood.id }}</p>
    <p>EMOCION: {{ mood.emotion }}</p>
    <p>MODELO: {{ mood.classifierModel }}</p>
    <p>PLAYLIST: {{ mood.linkedPlaylist }}</p>
    <p>FECHA DE CREACION: {{ createdAt }}</p>
    <p>USUARIO: {{ mood.userID }}</p>
    <UDivider />
    <iframe
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
</script>

<style scoped></style>
