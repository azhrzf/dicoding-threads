import { ActionType } from './action'

function threadVoteReducer (thread = {}, action = {}) {
  switch (action.type) {
    case ActionType.DOWN_VOTE_THREAD:
      return action.payload.thread
    case ActionType.UP_VOTE_THREAD:
      return action.payload.thread
    case ActionType.NEUTRAL_VOTE_THREAD:
      return action.payload.thread
    default:
      return thread
  }
}

export default threadVoteReducer
