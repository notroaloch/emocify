import { spotifyAPI } from '~/server/utils/api';

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const authToken = cookies['sb-provider-token'];

  const {
    type,
    timeRange,
    limit,
    offset,
  }: { type: string; timeRange: string; limit: number; offset: number } =
    getQuery(event);

  if (!authToken) {
    throw createError({
      statusCode: 400,
      statusMessage:
        '[E400-MC] - Missing cookie: sb-provider-token (spotify auth token)',
    });
  }

  if (!type) {
    throw createError({
      statusCode: 400,
      statusMessage:
        '[E400-MQP] - Missing query param: type (tracks | artists)',
    });
  } else if (type !== 'tracks' && type !== 'artists') {
    throw createError({
      statusCode: 400,
      statusMessage:
        '[E400-IQP] - Invalid query param: type (tracks | artists)',
    });
  }

  const data: any = await $fetch(
    spotifyAPI.endpoints.getCurrentUserTopItems + `/${type}`,
    {
      baseURL: spotifyAPI.baseURL,
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
      params: {
        timeRange,
        limit,
        offset,
      },
    }
  );

  return data.items;
});
