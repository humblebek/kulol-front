export const STORAGE_URL = import.meta.env.VITE_API_STORAGE_URL;
export const storageUrl = (fileName) => `${STORAGE_URL}${fileName}`;