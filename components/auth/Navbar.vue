<template>
  <nav class="flex h-[60px] items-center gap-6 p-4">
    <div class="flex-1">
      <UButton
        icon="i-streamline-face-scan-1"
        size="sm"
        color="primary"
        square
        variant="link"
        to="/auth/login"
      />
    </div>
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
