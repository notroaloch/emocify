<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'ph:moon' : 'ph:sun'"
      color="gray"
      variant="link"
      aria-label="Theme"
      @click="isDark = !isDark"
    />
    <template #fallback>
      <div class="h-8 w-8" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
  const colorMode = useColorMode();
  const isDark = computed({
    get() {
      return colorMode.value === 'dark';
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
    },
  });
</script>

<style scoped></style>
