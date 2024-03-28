import { newComment } from '@/utils/api'

const ActionType = {
  SEND_COMMENT: 'SEND_COMMENT'
}

function commentActionCreator (comment) {
  return {
    type: ActionType.SEND_COMMENT,
    payload: {
      comment
    }
  }
}

function asyncSetComment (threadId, token, content) {
  return async dispatch => {
    try {
      const comment = await newComment(threadId, token, content)
      dispatch(commentActionCreator(comment))
    } catch (error) {
      alert(error.message)
    }
  }
}

export { ActionType, commentActionCreator, asyncSetComment }
