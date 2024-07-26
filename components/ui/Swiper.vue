<template>
  <div class="flex flex-col gap-4">
    <slot name="header"></slot>
    <div
      v-dragscroll
      class="w-ful no-scrollbar grid cursor-grab grid-flow-col-dense gap-8 overflow-x-scroll py-1"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
