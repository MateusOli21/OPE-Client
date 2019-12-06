import axios from 'axios'
const { VUE_APP_GRADE_ENDPOINT } = process.env

export const updateAny = sprintInfo => {
  return axios.put(`${VUE_APP_GRADE_ENDPOINT || 'http://3.208.231.27:3003'}/endSprint`, { sprintInfo })
}

export const upsertCriterias = criterias => {
  return axios.post(`${VUE_APP_GRADE_ENDPOINT || 'http://3.208.231.27:3003'}/upsertCriterias`, { criterias })
}

export const setGroupGrade = (criterias, groupId, sprintInfo, sprintGrade, evaluator) => {
  return axios.post(`${VUE_APP_GRADE_ENDPOINT || 'http://3.208.231.27:3003'}/setGroupGrade`, { criterias, groupId, sprintInfo, sprintGrade, evaluator })
}

export const getCriterias = () => {
  return axios.get(`${VUE_APP_GRADE_ENDPOINT || 'http://3.208.231.27:3003'}/getCriterias`)
}

export const getGradesByStudentEmail = studentEmail => {
  return axios.get(`${VUE_APP_GRADE_ENDPOINT || 'http://3.208.231.27:3003'}/getGradesByStudentEmail`, {
    params: { studentEmail }
  })
}

export const deleteAny = cardId => {
  return axios.delete(`${VUE_APP_GRADE_ENDPOINT || 'http://3.208.231.27:3003'}/deleteCard`, { params: { cardId } })
}
