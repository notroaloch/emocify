export const useAuth = () => {
  const runtimeConfig = useRuntimeConfig();
  const supabase = useSupabaseClient();

  supabase.auth.onAuthStateChange((event, session) => {
    if (session && session.provider_token) {
      window.localStorage.setItem(
        'oauth_provider_token',
        session.provider_token
      );
    }

    if (session && session.provider_refresh_token) {
      window.localStorage.setItem(
        'oauth_provider_refresh_token',
        session.provider_refresh_token
      );
    }

    if (event === 'SIGNED_OUT') {
      window.localStorage.removeItem('oauth_provider_token');
      window.localStorage.removeItem('oauth_provider_refresh_token');
    }
  });

  const signInWithSpotify = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'spotify',
      options: {
        redirectTo: runtimeConfig.public.supabaseRedirectUrl,
        scopes: runtimeConfig.public.spotifyScopes,
      },
    });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      return navigateTo('/auth/login');
    }
  };

  return { signInWithSpotify, signOut };
};
