<!-- TODO: BETTER NO DATA AND CREATE NEW MOOD LINK -->
<template>
  <div class="flex flex-col items-center gap-4">
    <!-- TABLE -->
    <div class="flex w-full flex-col gap-2 border-t pt-2 dark:border-gray-800">
      <UButton
        icon="ph:trash"
        color="red"
        variant="ghost"
        class="w-fit"
        :label="
          selected.length === 0 ? 'Eliminar' : `Eliminar ${selected.length}`
        "
        :trailing="false"
        :disabled="selected.length === 0"
        @click="handleDeleteClick"
      />
      <UDivider />
      <UTable
        v-model="selected"
        :rows="rows"
        :columns="columns"
        :loading="isLoading"
      >
        <template #actions-data="{ row }">
          <UButton variant="link" icon="ph:eye" @click="handleViewClick(row)" />
        </template>
      </UTable>
    </div>
    <!-- PAGINATION -->
    <UPagination v-model="page" :page-count="pageCount" :total="moods.length" />
  </div>
</template>

<script setup lang="ts">
  const { isLoading } = defineProps<{
    isLoading: boolean;
  }>();

  const { deleteMood, deleteMoods } = useMood();
  const { selected, moods, rows, columns, page, pageCount } = useMoodTable();

  const handleViewClick = async ({ id }: any) => {
    await navigateTo(`/moods/${id}`);
  };

  const handleDeleteClick = async () => {
    const ids = selected.value.map((mood: Mood) => mood.id!);

    if (ids.length > 1) {
      await deleteMoods(ids);
    } else {
      await deleteMood(ids.at(0)!);
    }

    selected.value = [];
  };
</script>

<style scoped></style>
