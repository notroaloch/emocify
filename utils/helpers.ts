// DATES
export const getRelativeDateToNow = (date: string) => {
  const dayjs = useDayjs();
  const relativeDate = dayjs(date).from(dayjs());
  return relativeDate;
};

export const getFormattedDate = (date: string) => {
  const dayjs = useDayjs();
  const formattedDate = dayjs(date).format('DD/MM/YY - HH:mm');
  return formattedDate;
};

// MOODS
export const getMoodShortID = (id: string) => {
  return id.split('-').at(0);
};

export const getMoodEmoji = (emotion: string) => {
  let url;

  switch (emotion.toUpperCase()) {
    case 'ANGRY':
      url = '/images/moods/angry.png';
      break;
    case 'SAD':
      url = '/images/moods/sad.png';
      break;
    case 'NEUTRAL':
      url = '/images/moods/neutral.png';
      break;
    case 'HAPPY':
      url = '/images/moods/happy.png';
      break;
    default:
      url = '/images/moods/no-mood.png';
      break;
  }

  return url;
};

// UTILS
export const isArrayEmpty = (array: any[] | undefined) => {
  if (!array) return false;
  return array.length === 0;
};
