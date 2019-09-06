import { http } from "./config";

export const getGoogleURL = () => {
  return http.get("/googleUrl");
};

export const getUserData = code => {
  return http.get("/callbackGoogle", {
    params: { code: decodeURIComponent(code) }
  });
};
