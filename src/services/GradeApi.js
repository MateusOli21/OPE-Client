import axios from 'axios'
const { VUE_APP_GRADE_ENDPOINT } = process.env

export const updateAny = sprintInfo => {
  return axios.put(`${VUE_APP_GRADE_ENDPOINT}/endSprint`, { sprintInfo })
}

export const createSome = card => {
  return axios.post(`${VUE_APP_GRADE_ENDPOINT}/createCard`, { card })
}

export const getAnyWithParameters = (groupId, sprintNumber) => {
  return axios.get(`${VUE_APP_GRADE_ENDPOINT}/getCards`, { params: { groupId, sprintNumber } })
}

export const deleteAny = cardId => {
  return axios.delete(`${VUE_APP_GRADE_ENDPOINT}/deleteCard`, { params: { cardId } })
}
