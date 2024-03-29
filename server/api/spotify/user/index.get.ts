import { spotifyAPI } from '~/server/utils/api';

export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, 'oauth_provider_token');

  if (!authToken) {
    throw createError({
      statusCode: 400,
      statusMessage:
        '[E400-MC] - Missing cookie: oauth_provider_token (spotify auth token)',
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
