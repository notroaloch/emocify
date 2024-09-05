export type ArtistTopTracksResponse = {
  tracks: Track[];
};

export type TracksAudioFeaturesResponse = {
  audio_features: AudioFeatures[];
};

export type FollowedArtistsResponse = {
  artists: {
    href: string;
    limit: number;
    next: string;
    cursors: { after: string; before: string };
    total: number;
    items: Artist[];
  };
};

export type UserPlaylistsResponse = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Playlist[];
};

export type UserTopItemsResponse = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Artist[] | Track[];
};
