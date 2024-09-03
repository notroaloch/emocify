<template>
  <div
    class="mx-auto flex h-[calc(100vh-60px)] w-4/5 flex-col justify-center gap-8 md:w-1/2"
  >
    <!-- ABOUT TEXT -->
    <div class="flex items-center gap-5">
      <UIcon
        name="streamline:face-scan-1"
        class="text-primary h-[40px] w-[40px]"
      />
    </div>
    <div class="flex flex-col gap-6">
      <p class="text-justify text-gray-800 dark:text-gray-300">
        Emocify es una aplicación web que combina emociones con música a través
        del reconocimiento de expresiones faciales y recomendaciones de música
        personalizadas
      </p>
      <p class="text-justify text-gray-800 dark:text-gray-300">
        Utiliza tecnologías como la visión por computadora y algoritmos de
        clasificación para detectar un conjunto de emociones a través de las
        expresiones faciales
      </p>
      <p class="text-justify text-gray-800 dark:text-gray-300">
        La integración con el servicio de Spotify genera listas de reproducción
        personalizadas para cada usuario basadas en el estado de ánimo detectado
      </p>
    </div>

    <UDivider />

    <div class="flex flex-col gap-4">
      <!-- TECH STACK -->
      <div class="flex flex-col gap-2">
        <p class="text-sm uppercase tracking-tight text-gray-500">Frameworks</p>
        <div class="flex flex-wrap gap-1">
          <UBadge
            v-for="framework in frameworks"
            :key="framework"
            color="white"
            variant="solid"
          >
            {{ framework }}
          </UBadge>
        </div>
      </div>
      <!-- LINKS -->
      <div class="flex flex-col gap-2">
        <p class="text-sm uppercase tracking-tight text-gray-500">ENLACES</p>
        <ul class="flex flex-col gap-2">
          <li v-for="link in links" :key="link.id">
            <p
              class="hover:text-primary cursor-pointer text-sm text-gray-800 dark:text-gray-300"
              @click="handleClick(link.href)"
            >
              {{ link.id }}. {{ link.label }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'auth',
  });

  const frameworks = [
    'Nuxt 3',
    'Supabase',
    'Spotify API',
    'Mediapipe',
    'Sci-Kit Learn',
  ];

  const links = [
    {
      id: 1,
      label: 'Generación de Playlist Basadas en el Reconocimiento de Emociones',
      href: '/pdf/emocify-paper.pdf',
    },
    {
      id: 2,
      label: 'Reconocimiento Primer Lugar (Feria de Modulares INNI 2023B)',
      href: '/pdf/emocify-award.pdf',
    },
  ];

  const handleClick = async (href: string) => {
    await navigateTo(href, {
      open: {
        target: '_blank',
      },
    });
  };
</script>

<style scoped></style>
