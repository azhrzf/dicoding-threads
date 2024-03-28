import { getThreadDetail } from '@/utils/api'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

const ActionType = {
  THREAD_DETAIL: 'THREAD_DETAIL'
}

function receiveThreadDetailActionCreator (thread) {
  return {
    type: ActionType.THREAD_DETAIL,
    payload: {
      thread
    }
  }
}

function asyncGetThreadDetail (threadId) {
  return async dispatch => {
    dispatch(showLoading())
    try {
      const thread = await getThreadDetail(threadId)
      dispatch(receiveThreadDetailActionCreator(thread))
    } catch (error) {
      alert(error.message)
    } finally {
      dispatch(hideLoading())
    }
  }
}

export { ActionType, receiveThreadDetailActionCreator, asyncGetThreadDetail }
