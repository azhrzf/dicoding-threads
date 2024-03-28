import { login, ownProfile } from '@/utils/api'
import Cookies from 'js-cookie'

const ActionType = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  OWN_PROFILE: 'OWN_PROFILE'
}

function loginActionCreator (userDatas) {
  return {
    type: ActionType.LOGIN,
    payload: {
      userDatas
    }
  }
}

function logoutActionCreator () {
  return {
    type: ActionType.LOGOUT
  }
}

function getOwnProfile (userDatas) {
  return {
    type: ActionType.OWN_PROFILE,
    payload: {
      userDatas
    }
  }
}

function asyncSetLogin (email, password) {
  return async dispatch => {
    try {
      const userDatas = await login(email, password)
      if (userDatas.token) {
        alert('Login Success')
      }
      dispatch(loginActionCreator(userDatas))
      Cookies.set('token', userDatas.token)
    } catch (error) {
      alert(error.message)
    }
  }
}

function asyncSetLogout () {
  return async dispatch => {
    try {
      dispatch(logoutActionCreator())
      Cookies.remove('token')
      Cookies.remove('userDatas')
      alert('Logout Success')
    } catch (error) {
      alert(error.message)
    }
  }
}

function asyncGetOwnProfile () {
  return async dispatch => {
    try {
      const userDatas = await ownProfile(Cookies.get('token'))
      dispatch(getOwnProfile(userDatas))
      Cookies.set('userDatas', JSON.stringify(userDatas))
    } catch (error) {
      alert(error.message)
    }
  }
}

export {
  ActionType,
  loginActionCreator,
  logoutActionCreator,
  asyncSetLogin,
  asyncSetLogout,
  asyncGetOwnProfile
}
