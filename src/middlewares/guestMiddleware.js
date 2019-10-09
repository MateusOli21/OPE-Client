import { getGoogleUserData } from "../services/LocalStorage";

export const guestMiddleware = (to, from, next) => {
  const userData = getGoogleUserData();
  if (userData && userData.isStudent && !userData.groupId)
    return next("/escolhe-grupo");
  if (userData && userData.isStudent && userData.groupId)
    return next("/grupo-aluno");
  if (userData && !userData.isStudent) return next("/pagina-professor");
  next();
};
