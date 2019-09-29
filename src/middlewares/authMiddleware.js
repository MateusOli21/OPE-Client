export const authMiddleware = (to, from, next) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData && userData.isStudent && !userData.groupId && to.path === "/escolhe-grupo") return next()
  if(userData && userData.isStudent && userData.groupId && to.path === "/grupo-aluno") return next()
  if(userData && !userData.isStudent && to.path === "/pagina-professor") return next()
  next('/')
}