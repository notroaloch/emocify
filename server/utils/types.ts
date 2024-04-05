type ArtistTopTracksResponse = {
  tracks: Track[];
};

type TracksAudioFeaturesResponse = {
  audio_features: AudioFeatures[];
};

type FollowedArtistsResponse = {
  artists: {
    href: string;
    limit: number;
    next: string;
    cursors: { after: string; before: string };
    total: number;
    items: Artist[];
  };
};

type UserPlaylistsResponse = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Playlist[];
};

type UserTopItemsResponse = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Artist[] | Track[];
};
