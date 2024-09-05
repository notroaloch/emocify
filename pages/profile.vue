<template>
  <div class="mb-24 mt-2 flex flex-col gap-4">
    <p class="text-2xl font-bold tracking-tight">Perfil</p>
    <div
      class="flex w-full gap-8 overflow-clip rounded-lg border p-6 shadow-lg md:w-1/2 dark:border-gray-800"
    >
      <Ui3DCard>
        <NuxtImg :src="profilePictureUrl" class="w-[200px] shadow-lg" />
      </Ui3DCard>
      <div class="flex w-full flex-col gap-3">
        <!-- USER DISPLAY NAME AND EXTERNAL LINKT TO PROFILE -->
        <div class="group flex w-fit cursor-pointer items-center">
          <p
            class="group-hover:text-primary line-clamp-1 text-3xl font-semibold tracking-tight"
            @click="handleClick"
          >
            {{ displayName }}
          </p>
          <UIcon
            name="ph:arrow-up-right"
            class="group-hover:text-primary h-[15px] w-[15px]"
          />
        </div>
        <div class="flex gap-2">
          <!-- COUNTRY -->
          <UBadge color="white" variant="solid" class="w-fit">
            <div class="flex gap-2">
              <UIcon :name="country.icon" class="h-[15px] w-[15px]" />
              <p>{{ country.name }}</p>
            </div>
          </UBadge>
          <!-- FOLLOWERS -->
          <UBadge color="white" variant="solid" class="w-fit"
            >Seguidores {{ followers }}
          </UBadge>
          <!-- SPOTIFY PRODUCT TYPE -->
          <UBadge color="white" variant="solid" class="w-fit">{{
            productType
          }}</UBadge>
        </div>
        <div>
          <!-- ID -->
          <p class="text-xs text-gray-500">{{ user?.id }}</p>
          <!-- EMAIL -->
          <p class="text-xs text-gray-500">{{ user?.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { user } = storeToRefs(useSpotifyStore());
  const { fetchUser } = useSpotifyStore();

  const productType = computed(() => {
    return user.value?.product.toUpperCase();
  });
  const followers = computed(() => {
    return user.value?.followers.total;
  });

  const country = computed(() => {
    return {
      name: user.value?.country ? user.value.country : 'Tierra',
      icon: user.value?.country
        ? `circle-flags:${user.value.country.toLowerCase()}`
        : 'ph-globe-hemisphere-west',
    };
  });

  const displayName = computed(() => {
    return user.value?.display_name;
  });
  const profilePictureUrl = computed(() => {
    return user.value?.images.at(1).url;
  });

  // CACHES DATA TO PREVENT API REQUESTS ON EVERY PAGE NAVIGATION
  const nuxtApp = useNuxtApp();
  useAsyncData('user', () => fetchUser(), {
    getCachedData(key) {
      useAsyncDataCacheFunction(key, nuxtApp);
    },
  });

  const handleClick = async () => {
    await navigateTo(user.value?.external_urls.spotify, {
      open: {
        target: '_blank',
      },
    });
  };
</script>

<style scoped></style>
