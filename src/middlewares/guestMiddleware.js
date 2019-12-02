import { getGoogleUserData } from '../services/LocalForage'

export const guestMiddleware = async (to, from, next) => {
  const userData = await getGoogleUserData()
  const user = JSON.parse(userData)
  if (user && user.isStudent && !user.groupId) { return next('/escolhe-grupo') }
  if (user && user.isStudent && user.groupId) { return next('/grupo-aluno') }
  if (user && !user.isStudent) return next('/pagina-professor')
  next()
}
