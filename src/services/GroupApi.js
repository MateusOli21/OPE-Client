import axios from 'axios'

const { VUE_APP_GROUP_ENDPOINT } = process.env

export const createGroup = group => {
  return axios.post(`${VUE_APP_GROUP_ENDPOINT || 'http://3.208.231.27:3001'}/createGroup`, group)
}

export const joinGroupByCode = (entranceCode, email) => {
  return axios.post(`${VUE_APP_GROUP_ENDPOINT || 'http://3.208.231.27:3001'}/joinGroupByCode`, {
    entranceCode,
    email
  })
}

export const getGroupById = groupId => {
  return axios.get(`${VUE_APP_GROUP_ENDPOINT || 'http://3.208.231.27:3001'}/getGroupById`, {
    params: { groupId }
  })
}

export const updateGroupDetails = group => {
  return axios.put(`${VUE_APP_GROUP_ENDPOINT || 'http://3.208.231.27:3001'}/updateGroup`, {
    group
  })
}

export const updateOpenGroup = group => {
  return axios.put(`${VUE_APP_GROUP_ENDPOINT || 'http://3.208.231.27:3001'}/updateGroup`, { group })
}

export const getNewEntranceCode = groupId => {
  return axios.get(`${VUE_APP_GROUP_ENDPOINT || 'http://3.208.231.27:3001'}/updateEntranceCode`, {
    params: { groupId }
  })
}

export const kickFromGroup = email => {
  return axios.patch(`${VUE_APP_GROUP_ENDPOINT || 'http://3.208.231.27:3001'}/kickFromGroup`, { email })
}

export const exitFromGroup = (email, groupId) => {
  return axios.patch(`${VUE_APP_GROUP_ENDPOINT || 'http://3.208.231.27:3001'}/exitFromGroup`, {
    email,
    groupId
  })
}

export const getAllPcsta = () => {
  return axios.get(`${VUE_APP_GROUP_ENDPOINT || 'http://3.208.231.27:3001'}/getAllPcsta`)
}

export const getGroups = pcsta => {
  return axios.get(`${VUE_APP_GROUP_ENDPOINT || 'http://3.208.231.27:3001'}/getGroups`, {
    params: { pcsta }
  })
}
