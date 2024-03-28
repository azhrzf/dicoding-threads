import { ActionType } from './action'

function registerReducer (userDatas = {}, action = {}) {
  switch (action.type) {
    case ActionType.REGISTER:
      return action.payload.userDatas
    default:
      return userDatas
  }
}

export default registerReducer
