<template>
  <nav class="h-[60px] flex gap-6 items-center p-4">
    <h1 class="flex-1 text-xl font-bold text-primary">emocify</h1>
    <ul class="flex gap-4 text-sm">
      <li>
        <ULink
          to="/auth/login"
          active-class="text-primary"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >Iniciar Sesión</ULink
        >
      </li>
      <li>
        <ULink
          to="/about"
          active-class="text-primary"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >Acerca de</ULink
        >
      </li>
    </ul>
    <div>
      <UiToggleColorMode />
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped></style>
