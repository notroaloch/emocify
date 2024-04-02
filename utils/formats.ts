export const getMoodShortID = (id: string) => {
  return id.split('-').at(0);
};
