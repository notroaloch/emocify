export const useAuth = () => {
  const runtimeConfig = useRuntimeConfig();
  const supabase = useSupabaseClient();

  const providerAuthToken = useCookie('oauth_provider_token', {
    maxAge: 3600,
  });
  const providerAuthRefreshToken = useCookie('oauth_provider_refresh_token', {
    maxAge: 3600,
  });

  supabase.auth.onAuthStateChange((event, session) => {
    if (session && session.provider_token) {
      localStorage.setItem('oauth_provider_token', session.provider_token);
      providerAuthToken.value = session.provider_token;
    }

    if (session && session.provider_refresh_token) {
      localStorage.setItem(
        'oauth_provider_refresh_token',
        session.provider_refresh_token
      );
      providerAuthRefreshToken.value = session.provider_refresh_token;
    }

    if (event === 'SIGNED_OUT') {
      localStorage.removeItem('oauth_provider_token');
      localStorage.removeItem('oauth_provider_refresh_token');
      providerAuthToken.value = null;
      providerAuthRefreshToken.value = null;
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

    if (!error) {
      return true;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      return navigateTo('/auth/login');
    }
  };

  return { signInWithSpotify, signOut };
};
