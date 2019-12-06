import axios from 'axios'
const { VUE_APP_AUTH_ENDPOINT } = process.env

export const getGoogleURL = () => {
  return axios.get(`${VUE_APP_AUTH_ENDPOINT || 'http://3.208.231.27:3000'}/googleUrl`)
}

export const getGoogleUserData = code => {
  return axios.get(`${VUE_APP_AUTH_ENDPOINT || 'http://3.208.231.27:3000'}/callbackGoogle`, {
    params: { code: decodeURIComponent(code) }
  })
}

export const getUserByEmail = email => {
  return axios.get(`${VUE_APP_AUTH_ENDPOINT || 'http://3.208.231.27:3000'}/getUserByEmail`, {
    params: { email }
  })
}

export const getMembersByGroupId = groupId => {
  return axios.get(`${VUE_APP_AUTH_ENDPOINT || 'http://3.208.231.27:3000'}/getMembersByGroupId`, {
    params: { groupId }
  })
}

export const logout = email => {
  return axios.get(`${VUE_APP_AUTH_ENDPOINT || 'http://3.208.231.27:3000'}/logout`, {
    params: { email }
  })
}
