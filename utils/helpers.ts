export const isEmpty = (array: any[] | undefined) => {
  if (!array) return false;
  return array.length === 0;
};
