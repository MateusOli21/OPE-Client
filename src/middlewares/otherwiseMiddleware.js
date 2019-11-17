import { has } from "../services/LocalForage";

localStorage.removeItem("sprintRunningObject");

export const otherwiseMiddlware = async (to, from, next) => {
  if (await has("googleUserData")) return next("/escolhe-grupo");
  next("/");
};
