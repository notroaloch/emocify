type Mood = {
  id?: string;
  emotion: string;
  classifierModel: string;
  linkedPlaylist?: string;
  faceLandmarks: FaceLandmark[];
  faceBlendshapes: FaceBlendshape[];
  faceMatrix: number[];
  createdAt?: string;
  userID?: string;
};

type FaceLandmark = {
  x: number;
  y: number;
  z: number;
};

type FaceBlendshape = {
  index: number;
  displayName: string;
  categoryName: string;
  score: number;
};

// SPOTIFY INTERFACES

type SpotifyUser = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: { filter_enabled: boolean; filter_locked: boolean };
  external_urls: {
    spotify: string;
  };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
};

type Artist = {
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string; ean: string; upc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: any;
  restrictions: { reason: string };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

type Album = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: { reason: string };
  type: string;
  uri: string;
  artists: AlbumArtist[];
};

type AlbumArtist = {
  external_urls: { spotify: string };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type Playlist = {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: PlaylistOwner;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Track[];
  };
  type: string;
  uri: string;
};

type PlaylistOwner = {
  external_urls: { spotify: string };
  followers?: { href: string; total: number };
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name?: string;
  name?: string;
};

type Image = {
  url: string;
  height: number;
  width: number;
};
