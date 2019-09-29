import { http } from "./config";

export const getGoogleURL = () => {
  return http.get("/googleUrl");
};

export const getUserData = code => {
  return http.get("/callbackGoogle", {
    params: { code: decodeURIComponent(code) }
  });
};

export const logout = async function () {
  try {
    await http.get("/logout")
    localStorage.clear()
    this.$router.push('/')
    this.$router.go('/')
  } catch (err) {
    this.$swal.fire({
      type: "error",
      title: "Erro",
      text: err
    });
  }
}