import { serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const {
    name,
    isPublic = false,
    isCollaborative = false,
    description,
  }: {
    name: string;
    isPublic: boolean;
    isCollaborative: boolean;
    description: string;
  } = await readBody(event);

  const authToken = getCookie(event, 'oauth_provider_token');

  if (!authToken) {
    throw createError({
      statusCode: 401,
      statusMessage: '[E401-MC] - Missing cookie: oauth_provider_token',
    });
  }

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: '[E400-MB] - Missing body: name',
    });
  }

  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({
      statusCode: 500,
    });
  }

  const spotifyUserID = user.identities?.at(0)?.id;

  const playlist = await spotifyApi<Playlist>(
    `/users/${spotifyUserID}/playlists`,
    {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
      body: {
        name,
        public: isPublic,
        collaborative: isCollaborative,
        description,
      },
    }
  );

  return playlist;
});
