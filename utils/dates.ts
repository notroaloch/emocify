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
