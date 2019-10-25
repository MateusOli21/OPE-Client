import axios from "axios";
const { VUE_APP_SPRINT_ENDPOINT } = process.env;

export const getActivitiesByGrouping = (grouping, email) => {
  return axios.get(`${VUE_APP_SPRINT_ENDPOINT}/getActivitiesByGrouping`, {
    params: { grouping, email }
  });
};

export const startSprint = (sprintInfo, pcsta) => {
  return axios.post(`${VUE_APP_SPRINT_ENDPOINT}/startSprint`, { sprintInfo, pcsta });
};

export const endSprint = sprintInfo => {
  return axios.put(`${VUE_APP_SPRINT_ENDPOINT}/endSprint`, { sprintInfo });
};

export const getSprintInfo = pcstaId => {
  return axios.get(`${VUE_APP_SPRINT_ENDPOINT}/getSprintInfo`, {
    params: { pcstaId }
  });
};
