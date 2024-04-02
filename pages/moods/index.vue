<!-- TODO: BETTER NO DATA AND CREATE NEW MOOD LINK -->
<template>
  <div class="mb-8 mt-2">
    <p class="text-2xl font-bold tracking-tight">Moods</p>
    <div class="mt-6">
      <UiNoDataCard label="No hay moods" v-if="!moods || moods.length === 0" />
      <UTable
        v-else
        :loading="isLoading"
        :loading-state="{
          icon: 'i-heroicons-arrow-path-20-solid',
          label: 'Loading...',
        }"
        :progress="{ color: 'primary', animation: 'carousel' }"
        :rows="tableRows"
        :columns="tableColumns"
        @select="handleMoodSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const { moods, getMoods } = useMood();
  const tableRows = useState('mood-rows');

  const { pending: isLoading } = useAsyncData('moods/getMoods', async () => {
    return await getMoods();
  });

  const handleMoodSelect = async (mood: any) => {
    await navigateTo(`/moods/${mood.id}`);
  };

  watch(
    moods,
    () => {
      tableRows.value = moods.value?.map((m) => {
        return {
          id: m.id,
          shortID: getMoodShortID(m.id!),
          emotion: m.emotion,
          classifierModel: m.classifierModel,
          linkedPlaylist: m.linkedPlaylist,
          createdAt: m.createdAt,
          relativeCreatedAt: getFormattedDate(m.createdAt!),
        };
      });
    },
    { immediate: true }
  );

  const tableColumns = [
    {
      key: 'shortID',
      label: 'ID',
      sortable: true,
    },
    {
      key: 'emotion',
      label: 'EMOCIÓN',
      sortable: true,
    },
    {
      key: 'classifierModel',
      label: 'MODELO',
      sortable: true,
    },
    {
      key: 'relativeCreatedAt',
      label: 'CREACIÓN',
      sortable: true,
    },
    {
      key: 'linkedPlaylist',
      label: 'PLAYLIST',
      sortable: true,
    },
  ];
</script>

<style scoped></style>
