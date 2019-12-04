import axios from 'axios'
const { VUE_APP_GRADE_ENDPOINT } = process.env

export const updateAny = sprintInfo => {
  return axios.put(`${VUE_APP_GRADE_ENDPOINT}/endSprint`, { sprintInfo })
}

export const upsertCriterias = criterias => {
  return axios.post(`${VUE_APP_GRADE_ENDPOINT}/upsertCriterias`, { criterias })
}

export const setGroupGrade = (criterias, groupId, sprintInfo, sprintGrade, evaluator) => {
  return axios.post(`${VUE_APP_GRADE_ENDPOINT}/setGroupGrade`, { criterias, groupId, sprintInfo, sprintGrade, evaluator })
}

export const getCriterias = () => {
  return axios.get(`${VUE_APP_GRADE_ENDPOINT}/getCriterias`)
}

export const getGradesByStudentEmail = studentEmail => {
  return axios.get(`${VUE_APP_GRADE_ENDPOINT}/getGradesByStudentEmail`, {
    params: { studentEmail }
  })
}

export const deleteAny = cardId => {
  return axios.delete(`${VUE_APP_GRADE_ENDPOINT}/deleteCard`, { params: { cardId } })
}
