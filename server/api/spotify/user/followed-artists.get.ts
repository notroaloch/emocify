export default defineEventHandler(async (event) => {
  const { limit }: { limit: number } = getQuery(event);
  const authToken = getCookie(event, 'oauth_provider_token');

  if (!authToken) {
    throw createError({
      statusCode: 401,
      statusMessage: '[E401-MC] - Missing cookie: oauth_provider_token',
    });
  }

  const { artists }: FollowedArtistsResponse = await $fetch(
    spotifyAPI.endpoints.getCurrentUserFollowedArtists,
    {
      baseURL: spotifyAPI.baseURL,
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
      query: {
        type: 'artist',
        limit,
      },
    }
  );

  return artists.items;
});
