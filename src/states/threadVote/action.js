import Cookies from 'js-cookie'
import { upVoteThread, downVoteThread, neutralVoteThread } from '@/utils/api'

const ActionType = {
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD'
}

function upVoteThreadActionCreator (thread) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      thread
    }
  }
}

function downVoteThreadActionCreator (thread) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      thread
    }
  }
}

function neutralVoteThreadActionCreator (thread) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      thread
    }
  }
}

function asyncUpVoteThread (threadId) {
  return async dispatch => {
    try {
      if (!Cookies.get('token')) {
        throw new Error('Unauthorized')
      }
      const thread = await upVoteThread(threadId, Cookies.get('token'))
      dispatch(upVoteThreadActionCreator(thread))
    } catch (error) {
      alert(error.message, 'error UP')
    }
  }
}

function asyncDownVoteThread (threadId) {
  return async dispatch => {
    try {
      if (!Cookies.get('token')) {
        throw new Error('Unauthorized')
      }
      const thread = await downVoteThread(threadId, Cookies.get('token'))
      dispatch(downVoteThreadActionCreator(thread))
    } catch (error) {
      alert(error.message, 'ERROR DOWN')
    }
  }
}

function asyncNeutralVoteThread (threadId) {
  return async dispatch => {
    try {
      if (!Cookies.get('token')) {
        throw new Error('Unauthorized')
      }
      const thread = await neutralVoteThread(threadId, Cookies.get('token'))
      dispatch(neutralVoteThreadActionCreator(thread))
    } catch (error) {
      alert(error.message, 'error NEUT')
    }
  }
}

export {
  ActionType,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread
}
