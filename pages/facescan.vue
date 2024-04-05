<template>
  <!-- NEEDED TO PREVENT DOCUMENT UNDEFINED ERROR WHEN SSR -->
  <ClientOnly>
    <!-- IT NEEDS TO BE A SINGLE COMPONENT -->
    <FaceScanVideo />
  </ClientOnly>
</template>

<script setup lang="ts">
  const {
    userTopTracks,
    userTopArtists,
    userFollowedArtists,
    getUserTopTracks,
    getUserTopArtists,
    getUserFollowedArtists,
  } = useSpotify();

  const { moods, getMoods } = useMood();
  // FETCH INITIAL DATA
  callOnce('index-callOnce', async () => {
    if (
      !moods.value ||
      !userTopTracks.value ||
      !userTopArtists.value ||
      !userFollowedArtists.value
    ) {
      await Promise.all([
        getMoods(),
        getUserTopTracks(),
        getUserTopArtists(),
        getUserFollowedArtists(),
      ]);
    }
  });
</script>

<style scoped></style>
