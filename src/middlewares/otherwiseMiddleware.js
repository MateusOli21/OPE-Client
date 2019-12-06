import { has } from '../services/LocalForage'

export const otherwiseMiddlware = async (to, from, next) => {
  if (await has('googleUserData')) return next('/escolhe-grupo')
  next('/')
}
