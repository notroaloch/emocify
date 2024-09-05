export default defineEventHandler(async (event) => {
  const {
    type,
    timeRange = 'long_term',
    limit,
    offset,
  }: {
    type: string;
    timeRange: string;
    limit: number;
    offset: number;
  } = getQuery(event);
  const authToken = getCookie(event, 'oauth_provider_token');

  if (!authToken) {
    throw createError({
      statusCode: 401,
      statusMessage: '[E401-MC] - Missing cookie: oauth_provider_token',
    });
  }

  if (!type) {
    throw createError({
      statusCode: 400,
      statusMessage:
        '[E400-MQP] - Missing query param: type [tracks | artists]',
    });
  } else if (type !== 'tracks' && type !== 'artists') {
    throw createError({
      statusCode: 400,
      statusMessage:
        '[E400-IQP] - Invalid query param: type (tracks | artists)',
    });
  }

  const { items } = await spotifyApi<UserTopItemsResponse>(`/me/top/${type}`, {
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
    query: {
      timeRange,
      limit,
      offset,
    },
  });

  return items;
});
