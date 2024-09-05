import { $fetch } from 'ofetch';

export const spotifyApi = $fetch.create({
  baseURL: 'https://api.spotify.com/v1',
});
