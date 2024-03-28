<template>
  <div
    class="flex w-full flex-col items-center justify-center gap-8 rounded-md pb-24 pt-8"
  >
    <NuxtImg
      :src="user?.images.at(1)?.url"
      class="rounded-full shadow-xl"
      width="200px"
    />

    <div class="grid">
      <p>{{ user?.id }}</p>
      <p>{{ user?.display_name }}</p>
      <p>{{ user?.followers.total }}</p>
      <p>{{ user?.country }}</p>
      <p>{{ user?.product }}</p>
      <p>{{ user?.email }}</p>
      <p>{{ user?.explicit_content.filter_enabled }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { user } = useSpotify();
</script>

<style scoped></style>
