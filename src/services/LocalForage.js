import localForage from 'localforage'

export const getItem = key => localForage.getItem(key)

export const setItem = (key, value) => localForage.setItem(key, value)

export const getObject = key => localForage.getItem(key)

export const setObject = (key, object) =>
  localForage.setItem(key, object)

export const has = key => localForage.getItem(key)

export const clearStorage = () => localForage.clear()

export const getGoogleUserData = () =>
  localForage.getItem('googleUserData')
