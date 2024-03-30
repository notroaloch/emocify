<template></template>

<script setup lang="ts">
  definePageMeta({
    layout: 'auth',
  });

  const user = useSupabaseUser();
  const supabase = useSupabaseClient();
  const authToken = useCookie('oauth_provider_token', { maxAge: 3600 });

  watch(
    user,
    async () => {
      if (user.value) {
        const session = await supabase.auth.getSession();
        authToken.value = session.data.session?.provider_token;
        return navigateTo('/');
      }
    },
    { immediate: true }
  );
</script>
