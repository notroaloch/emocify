export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, 'oauth_provider_token');

  if (!authToken) {
    throw createError({
      statusCode: 401,
      statusMessage: '[E401-MC] - Missing cookie: oauth_provider_token',
    });
  }

  const user = await spotifyApi<SpotifyUser>('/me', {
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
  });

  return user;
});
