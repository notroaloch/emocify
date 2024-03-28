import { spotifyAPI } from '~/server/utils/api';

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const authToken = cookies['sb-provider-token'];

  if (!authToken) {
    throw createError({
      statusCode: 500,
      statusMessage: '[E500-MC] - Missing auth token in cookies',
    });
  }

  const data = await $fetch(spotifyAPI.endpoints.getCurrentUser, {
    baseURL: spotifyAPI.baseURL,
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
  });

  return data;
});
