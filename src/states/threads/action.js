import { getAllThreads, newThread } from '@/utils/api'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD'
}

function receiveThreadsActionCreator (threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads
    }
  }
}

function addThreadActionCreator (thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread
    }
  }
}

function asyncGetAllThreads () {
  return async dispatch => {
    dispatch(showLoading())
    try {
      const threads = await getAllThreads()
      dispatch(receiveThreadsActionCreator(threads))
    } catch (error) {
      alert(error.message)
    } finally {
      dispatch(hideLoading())
    }
  }
}

function asyncAddThread (title, body, category, token) {
  return async dispatch => {
    dispatch(showLoading())
    try {
      const thread = await newThread(title, body, category, token)
      dispatch(addThreadActionCreator(thread))
      if (thread) {
        alert('Thread berhasil dibuat')
      }
    } catch (error) {
      alert(error.message)
    } finally {
      dispatch(hideLoading())
    }
  }
}

export {
  ActionType,
  receiveThreadsActionCreator,
  asyncGetAllThreads,
  addThreadActionCreator,
  asyncAddThread
}
