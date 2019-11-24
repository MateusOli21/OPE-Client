import axios from 'axios'
const { VUE_APP_AUTH_ENDPOINT } = process.env

export const getGoogleURL = () => {
  return axios.get(`${VUE_APP_AUTH_ENDPOINT}/googleUrl`)
}

export const getGoogleUserData = code => {
  return axios.get(`${VUE_APP_AUTH_ENDPOINT}/callbackGoogle`, {
    params: { code: decodeURIComponent(code) }
  })
}

export const getUserByEmail = email => {
  return axios.get(`${VUE_APP_AUTH_ENDPOINT}/getUserByEmail`, {
    params: { email }
  })
}

export const getMembersByGroupId = groupId => {
  return axios.get(`${VUE_APP_AUTH_ENDPOINT}/getMembersByGroupId`, {
    params: { groupId }
  })
}

export const logout = email => {
  return axios.get(`${VUE_APP_AUTH_ENDPOINT}/logout`, {
    params: { email }
  })
}
