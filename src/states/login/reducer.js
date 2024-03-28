import { ActionType } from './action'

function loginReducer (userDatas = {}, action = {}) {
  switch (action.type) {
    case ActionType.LOGIN:
      return action.payload.userDatas
    case ActionType.LOGOUT:
      return {}
    case ActionType.OWN_PROFILE:
      return action.payload.userDatas
    default:
      return userDatas
  }
}

export default loginReducer
