import axios from 'axios'
const { VUE_APP_SPRINT_ENDPOINT } = process.env

export const getActivitiesByGrouping = (grouping, email) => {
  return axios.get(`${VUE_APP_SPRINT_ENDPOINT || 'http://3.208.231.27:3002'}/getActivitiesByGrouping`, {
    params: { grouping, email }
  })
}

export const startSprint = (sprintInfo, pcsta) => {
  return axios.post(`${VUE_APP_SPRINT_ENDPOINT || 'http://3.208.231.27:3002'}/startSprint`, { sprintInfo, pcsta })
}

export const endSprint = sprintInfo => {
  return axios.put(`${VUE_APP_SPRINT_ENDPOINT || 'http://3.208.231.27:3002'}/endSprint`, { sprintInfo })
}

export const getSprintInfo = pcstaId => {
  return axios.get(`${VUE_APP_SPRINT_ENDPOINT || 'http://3.208.231.27:3002'}/getSprintInfo`, {
    params: { pcstaId }
  })
}

export const getSprintInfoById = sprintInfoId => {
  return axios.get(`${VUE_APP_SPRINT_ENDPOINT || 'http://3.208.231.27:3002'}/getSprintInfoById`, {
    params: { sprintInfoId }
  })
}

export const createCard = card => {
  return axios.post(`${VUE_APP_SPRINT_ENDPOINT || 'http://3.208.231.27:3002'}/createCard`, { card })
}

export const getCards = (groupId, sprintNumber) => {
  return axios.get(`${VUE_APP_SPRINT_ENDPOINT || 'http://3.208.231.27:3002'}/getCards`, { params: { groupId, sprintNumber } })
}

export const deleteCard = cardId => {
  return axios.delete(`${VUE_APP_SPRINT_ENDPOINT || 'http://3.208.231.27:3002'}/deleteCard`, { params: { cardId } })
}

export const updateCard = card => {
  return axios.put(`${VUE_APP_SPRINT_ENDPOINT || 'http://3.208.231.27:3002'}/updateCard`, { card })
}

export const verifyActvitiesByGrouping = (grouping, email) => {
  return axios.get(`${VUE_APP_SPRINT_ENDPOINT || 'http://3.208.231.27:3002'}/verifyActvitiesByGrouping`, { params: { grouping, email } })
}

export const createActivitiesByGrouping = (grouping, email) => {
  return axios.post(`${VUE_APP_SPRINT_ENDPOINT || 'http://3.208.231.27:3002'}/createActivitiesByGrouping`, { grouping, email })
}

export const getReviewBacklog = (groupId, sprintNumber) => {
  return axios.get(`${VUE_APP_SPRINT_ENDPOINT || 'http://3.208.231.27:3002'}/getReviewBacklog`, { params: { groupId, sprintNumber } })
}
