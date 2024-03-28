<template></template>

<script setup lang="ts">
  definePageMeta({
    layout: 'auth',
  });

  const user = useSupabaseUser();

  watch(
    user,
    () => {
      if (user.value) {
        useSpotify();
        return navigateTo('/');
      }
    },
    { immediate: true }
  );
</script>

<style scoped></style>
