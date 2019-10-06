import { getUserByEmail } from "../services/AuthApi"

export const authMiddleware = async (to, from, next) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  const { data: { user } } = await getUserByEmail(userData.email)
  localStorage.setItem("userData", JSON.stringify(user))
  if (user) {
    if (user.isStudent && !user.groupId && to.path === "/escolhe-grupo") return next()
    if (user.isStudent && !!user.groupId && to.path === "/grupo-aluno") return next()
    if (!user.isStudent && to.path === "/pagina-professor") return next()
  }
  next('/')
}