import { getUserByEmail } from "../services/AuthApi";
import {
  getGoogleUserData,
  setObject,
  getItem
} from "../services/LocalForage";
localStorage.removeItem("sprintRunningObject");

export const authMiddleware = async (to, from, next) => {
  const path = await getItem("path");
  const userData = await getGoogleUserData();
  const userParse = JSON.parse(userData);
  const {
    data: { user }
  } = await getUserByEmail(userParse.email);

  await setObject("googleUserData", JSON.stringify(user));

  if (user) {
    if (!path) {
      if (user.isStudent && !user.groupId && to.path === "/escolhe-grupo")
        return next();
      if (user.isStudent && !!user.groupId && to.path === "/grupo-aluno")
        return next();
      if (!user.isStudent && to.path === "/pagina-professor") return next();
      return next();
    } else {
      if (user.isStudent && !user.groupId && to.path !== "/escolhe-grupo" && path === "/escolhe-grupo")
        return next("/escolhe-grupo");
      if (user.isStudent && !!user.groupId && to.path === "/grupo-aluno")
        return next();
      if (!user.isStudent && to.path === "/pagina-professor") return next();
      return next();
    }
  }
  next("/");
};
