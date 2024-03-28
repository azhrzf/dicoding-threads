import { configureStore } from '@reduxjs/toolkit'
import threadsReducer from './threads/reducer'
import threadDetailReducer from './threadDetail/reducer'
import leaderboardsReducer from './leaderboards/reducer'
import registerReducer from './register/reducer'
import loginReducer from './login/reducer'
import { loadingBarReducer } from 'react-redux-loading-bar'
import threadVoteReducer from './threadVote/reducer'
import commentReducer from './comment/reducer'

const store = configureStore({
  reducer: {
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    register: registerReducer,
    login: loginReducer,
    loadingBar: loadingBarReducer,
    threadVote: threadVoteReducer,
    comment: commentReducer
  }
})

export default store
