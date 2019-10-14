import { getUserByEmail } from "../services/AuthApi";
import { getGoogleUserData } from "../services/LocalStorage";

export const authMiddleware = async (to, from, next) => {
  const userData = getGoogleUserData();
  const groupDetail = localStorage.getItem("groupDetails");
  const {
    data: { user }
  } = await getUserByEmail(userData.email);
  localStorage.setItem("googleUserData", JSON.stringify(user));
  if (user) {
    if (user.isStudent && !user.groupId && to.path === "/escolhe-grupo")
      return next();
    if (user.isStudent && !!user.groupId && to.path === "/grupo-aluno")
      return next();
    if (!user.isStudent && to.path === "/pagina-professor") return next();
    if (!user.isStudent && to.path === "/detalhes-grupo" && groupDetail)
      return next();
  }
  next("/");
};
