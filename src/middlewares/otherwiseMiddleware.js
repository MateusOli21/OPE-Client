import { has } from "../services/LocalStorage";

export const otherwiseMiddlware = (to, from, next) => {
  if (has("googleUserData")) return next("/escolhe-grupo");
  next("/");
};
