<template>
  <!-- NEEDED TO PREVENT DOCUMENT UNDEFINED ERROR WHEN SSR -->
  <ClientOnly>
    <!-- IT NEEDS TO BE A SINGLE COMPONENT -->
    <FaceScanVideo />
  </ClientOnly>
</template>

<script setup lang="ts"></script>

<style scoped></style>
