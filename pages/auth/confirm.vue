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
        return navigateTo('/');
      }
    },
    { immediate: true }
  );
</script>

<style scoped></style>
