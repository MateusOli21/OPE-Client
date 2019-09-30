import axios from "axios";
/* eslint-disable */
const { VUE_APP_GROUP_ENDPOINT } = process.env;

export const createGroup = group => {
  return axios.post(`${VUE_APP_GROUP_ENDPOINT}/createGroup`, group);
};

export const sendEntranceCode = (entranceCode, email) => {
  return axios.get(`${VUE_APP_GROUP_ENDPOINT}/joinGroupByCode`, {
    params: { entranceCode, email }
  });
};

export const getGroupById = groupId => {
  return axios.get(`${VUE_APP_GROUP_ENDPOINT}/getGroupById`, {
    params: { groupId }
  });
};

export const updateOpenGroup = group => {
  return axios.put(`${VUE_APP_GROUP_ENDPOINT}/updateGroup`, { group });
};

export const getNewEntranceCode = groupId => {
  return axios.get(`${VUE_APP_GROUP_ENDPOINT}/updateEntranceCode`, {
    params: { groupId }
  });
};

export const kickFromGroup = email => {
  return axios.patch(`${VUE_APP_GROUP_ENDPOINT}/kickFromGroup`, { email });
};

export const exitFromGroup = email => {
  return axios.patch(`${VUE_APP_GROUP_ENDPOINT}/exitFromGroup`, { email });
};