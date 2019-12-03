import axios from 'axios'
const { VUE_APP_SPRINT_ENDPOINT } = process.env

export const getActivitiesByGrouping = (grouping, email) => {
  return axios.get(`${VUE_APP_SPRINT_ENDPOINT}/getActivitiesByGrouping`, {
    params: { grouping, email }
  })
}

export const startSprint = (sprintInfo, pcsta) => {
  return axios.post(`${VUE_APP_SPRINT_ENDPOINT}/startSprint`, { sprintInfo, pcsta })
}

export const endSprint = sprintInfo => {
  return axios.put(`${VUE_APP_SPRINT_ENDPOINT}/endSprint`, { sprintInfo })
}

export const getSprintInfo = pcstaId => {
  return axios.get(`${VUE_APP_SPRINT_ENDPOINT}/getSprintInfo`, {
    params: { pcstaId }
  })
}

export const createCard = card => {
  return axios.post(`${VUE_APP_SPRINT_ENDPOINT}/createCard`, { card })
}

export const getCards = (groupId, sprintNumber) => {
  return axios.get(`${VUE_APP_SPRINT_ENDPOINT}/getCards`, { params: { groupId, sprintNumber } })
}

export const deleteCard = cardId => {
  return axios.delete(`${VUE_APP_SPRINT_ENDPOINT}/deleteCard`, { params: { cardId } })
}

export const updateCard = card => {
  return axios.put(`${VUE_APP_SPRINT_ENDPOINT}/updateCard`, { card })
}

export const verifyActvitiesByGrouping = (grouping, email) => {
  return axios.get(`${VUE_APP_SPRINT_ENDPOINT}/verifyActvitiesByGrouping`, { params: { grouping, email } })
}

export const createActivitiesByGrouping = (grouping, email) => {
  return axios.post(`${VUE_APP_SPRINT_ENDPOINT}/createActivitiesByGrouping`, { grouping, email })
}
