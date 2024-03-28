import { spotifyAPI } from '~/server/utils/api';

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const authToken = cookies['sb-provider-token'];

  const {
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

  const data: any = await $fetch(spotifyAPI.endpoints.getCurrentUserPlaylists, {
    baseURL: spotifyAPI.baseURL,
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
    params: {
      limit,
      offset,
    },
  });

  return data.items;
});
