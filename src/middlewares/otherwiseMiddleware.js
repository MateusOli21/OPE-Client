export const otherwiseMiddlware = (to, from, next) => {
  if (localStorage.getItem("googleUserData")) return next("/escolhe-grupo");
  next("/");
};
