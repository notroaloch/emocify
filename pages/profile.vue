<template>
  <div class="mb-24 mt-2 flex flex-col gap-4">
    <p class="text-2xl font-bold tracking-tight">Perfil</p>
    <div
      class="flex w-full gap-8 overflow-clip rounded-lg border p-6 shadow-lg md:w-1/2 dark:border-gray-800"
    >
      <Ui3DCard>
        <NuxtImg
          :src="
            user?.images ? user.images.at(1)!.url : 'https://placehold.co/400'
          "
          class="w-[200px] shadow-lg"
        />
      </Ui3DCard>
      <div class="flex w-full flex-col gap-3">
        <!-- USER DISPLAY NAME AND EXTERNAL LINKT TO PROFILE -->
        <div class="group flex w-fit cursor-pointer items-center">
          <p
            class="group-hover:text-primary line-clamp-1 text-3xl font-semibold tracking-tight"
            @click="handleClick"
          >
            {{ user?.display_name }}
          </p>
          <UIcon
            name="i-material-symbols-arrow-outward-rounded"
            class="group-hover:text-primary h-[15px] w-[15px]"
          />
        </div>
        <div class="flex gap-2">
          <!-- COUNTRY -->
          <UBadge color="white" variant="solid" class="w-fit">
            <div class="flex gap-2">
              <UIcon
                :name="countryIcon ? countryIcon : 'i-material-symbols-globe'"
                class="h-[15px] w-[15px]"
                dynamic
              />
              <p>{{ user?.country }}</p>
            </div>
          </UBadge>
          <!-- FOLLOWERS -->
          <UBadge color="white" variant="solid" class="w-fit"
            >Seguidores {{ user?.followers.total }}
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
  const { user, getUser } = useSpotify();
  const countryIcon = useState('countryIcon');
  const productType = useState('productType');

  const { pending: isLoading } = useAsyncData(
    'isLoadingUserPlaylists',
    async () => {
      return await getUser();
    }
  );

  watch(user, () => {
    if (!user) return;
    countryIcon.value = 'i-circle-flags-' + user.value?.country.toLowerCase();
    productType.value =
      user.value?.product === 'free' ? 'Spotify Básico' : 'Spotify Premium';
  });

  const handleClick = async () => {
    await navigateTo(user.value?.external_urls.spotify, {
      open: {
        target: '_blank',
      },
    });
  };

  callOnce('index-callOnce', async () => {
    if (!user.value) {
      await getUser();
    }
  });
</script>

<style scoped></style>
