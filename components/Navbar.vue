<template>
  <nav class="h-[60px] flex gap-6 items-center">
    <div class="flex-1">
      <UButton
        icon="i-streamline-face-scan-1"
        size="sm"
        color="primary"
        square
        variant="link"
        to="/"
      />
    </div>
    <ul class="flex gap-4 text-sm">
      <li>
        <ULink
          to="/"
          active-class="text-primary"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >Inicio</ULink
        >
      </li>
      <li>
        <ULink
          to="/scan"
          active-class="text-primary"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >FaceScan</ULink
        >
      </li>
      <li>
        <ULink
          to="/moods"
          active-class="text-primary"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >Moods</ULink
        >
      </li>
      <li>
        <ULink
          to="/playlists"
          active-class="text-primary"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >Playlists</ULink
        >
      </li>
      <li>
        <ULink
          to="/profile"
          active-class="text-primary"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >Perfil</ULink
        >
      </li>
      <li>
        <ULink
          @click="signOut"
          active-class="text-primary"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >Salir</ULink
        >
      </li>
    </ul>
    <div>
      <UiToggleColorMode />
    </div>
  </nav>
</template>

<script setup lang="ts">
  const { signOut } = useAuth();
</script>

<style scoped></style>
