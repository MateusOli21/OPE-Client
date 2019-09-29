export const guestMiddleware = (to, from, next) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(userData && userData.isStudent && !userData.groupId) return next('/escolhe-grupo')
    if(userData && userData.isStudent && userData.groupId) return next('/grupo-aluno')
    if(userData && !userData.isStudent) return next('/pagina-professor')
    next()
  }