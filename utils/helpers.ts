// DATES
export const getRelativeDateToNow = (date: string) => {
  const dayjs = useDayjs();
  const relativeDate = dayjs(date).from(dayjs());
  return relativeDate;
};

export const getFormattedDate = (date: string) => {
  const dayjs = useDayjs();
  const formattedDate = dayjs(date).format('DD/MM/YYYY - HH:mm:ss');
  return formattedDate;
};

// MOODS
export const getMoodShortID = (id: string) => {
  return id.split('-').at(0);
};

// SPOTIFY
export const generatePlaylistName = (mood: Mood) => {
  const name = `EMOCIFY ${mood.emotion} (${getMoodShortID(mood.id!)})`;
  return name;
};

export const generatePlaylistDescription = () => {
  const description = 'Playlist generada automáticamente desde EMOCIFY';
  return description;
};

export const getArtistsAsUniqueArray = (top: Artist[], followed: Artist[]) => {
  const ids: string[] = [];
  const artists: Artist[] = [];
  const all: Artist[] = [top, followed].flat();

  all.forEach((artist) => {
    if (!ids.includes(artist.id)) {
      ids.push(artist.id);
      artists.push(artist);
    }
  });

  return artists;
};

// UTILS
export const isArrayEmpty = (array: any[] | undefined) => {
  if (!array) return false;
  return array.length === 0;
};
