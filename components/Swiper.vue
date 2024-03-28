<template>
  <slot name="header"></slot>
  <div
    v-dragscroll
    class="w-ful grid cursor-grab grid-flow-col-dense gap-8 overflow-x-scroll py-1"
  >
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
