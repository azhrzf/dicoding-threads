import { ActionType } from './action'

function threadDetailReducer (thread = {}, action = {}) {
  switch (action.type) {
    case ActionType.THREAD_DETAIL:
      return action.payload.thread
    default:
      return thread
  }
}

export default threadDetailReducer
