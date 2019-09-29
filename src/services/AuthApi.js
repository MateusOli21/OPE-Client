import axios from "axios";
const { VUE_APP_AUTH_ENDPOINT } = process.env;

export const getGoogleURL = () => {
  return axios.get(`${VUE_APP_AUTH_ENDPOINT}/googleUrl`);
};

export const getUserData = code => {
  return axios.get(`${VUE_APP_AUTH_ENDPOINT}/callbackGoogle`, {
    params: { code: decodeURIComponent(code) }
  });
};

export const logout = async function () {
  try {
    await axios.get(`${VUE_APP_AUTH_ENDPOINT}/logout`)
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