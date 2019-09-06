import axios from "axios";
const { VUE_APP_SERVER_ENDPOINT } = process.env;

export const http = axios.create({
  baseURL: VUE_APP_SERVER_ENDPOINT
});
