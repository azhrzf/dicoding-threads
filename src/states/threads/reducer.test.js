import { describe, it, expect } from 'vitest'
import threadsReducer from './reducer'

describe('threadsReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = []
    const action = { type: 'UNKNOWN' }
    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual(initialState)
  })
})

describe('threadReducers function', () => {
  it('should return the threads when given by RECEIVE_THREADS action', () => {
    const initialState = []
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0
          }
        ]
      }
    }
    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual(action.payload.threads)
  })
})
