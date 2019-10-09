export const getItem = key => localStorage.getItem(key);

export const setItem = (key, value) => localStorage.setItem(key, value);

export const getObject = key => JSON.parse(localStorage.getItem(key));

export const setObject = (key, object) =>
  localStorage.setItem(key, JSON.stringify(object));

export const has = key => localStorage.getItem(key);

export const clearStorage = () => localStorage.clear();
