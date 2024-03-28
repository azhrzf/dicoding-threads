import { register } from '@/utils/api'

const ActionType = {
  REGISTER: 'REGISTER'
}

function registerActionCreator (userDatas) {
  return {
    type: ActionType.REGISTER,
    payload: {
      userDatas
    }
  }
}

function asyncSetRegister (name, email, password) {
  return async dispatch => {
    try {
      const userDatas = await register(name, email, password)
      if (userDatas.id) {
        alert('Register Success')
      }
      dispatch(registerActionCreator(userDatas))
    } catch (error) {
      alert(error.message)
    }
  }
}

export { ActionType, registerActionCreator, asyncSetRegister }
