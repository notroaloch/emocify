export const useAsyncDataCacheFunction = (key: string, nuxtApp: any) => {
  return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
};
