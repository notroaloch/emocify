export default defineEventHandler(async (event) => {
  const { limit, offset }: { limit: number; offset: number } = getQuery(event);
  const authToken = getCookie(event, 'oauth_provider_token');

  if (!authToken) {
    throw createError({
      statusCode: 401,
      statusMessage: '[E401-MC] - Missing cookie: oauth_provider_token',
    });
  }

  const { items } = await spotifyApi<UserPlaylistsResponse>('/me/playlists', {
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
    query: {
      limit,
      offset,
    },
  });

  return items;
});
