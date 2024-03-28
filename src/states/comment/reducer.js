import { ActionType } from './action'

function commentReducer (comment = {}, action = {}) {
  switch (action.type) {
    case ActionType.SEND_COMMENT:
      return action.payload.comment
    default:
      return comment
  }
}

export default commentReducer
