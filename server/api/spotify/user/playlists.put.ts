export default defineEventHandler(async (event) => {
  const { id }: { id: string } = getQuery(event);
  const {
    position,
    uris,
  }: {
    position: number;
    uris: string[];
  } = await readBody(event);
  const authToken = getCookie(event, 'oauth_provider_token');

  if (!authToken) {
    throw createError({
      statusCode: 401,
      statusMessage: '[E401-MC] - Missing cookie: oauth_provider_token',
    });
  }

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: '[E400-MQP] - Missing query param: id',
    });
  }

  await spotifyApi(`/playlists/${id}/tracks`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
    body: {
      uris,
      position,
    },
  });

  return true;
});
