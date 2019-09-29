import axios from "axios";
const { VUE_APP_GROUP_ENDPOINT } = process.env;

export const createGroup = group => {
  return axios.post(`${VUE_APP_GROUP_ENDPOINT}/createGroup`, group);
};

export const sendEntranceCode = code => {
  return axios.post(`${VUE_APP_GROUP_ENDPOINT}/entranceCode`, code);
};