import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest'
import { getAllThreads } from '@/utils/api'
import { asyncGetAllThreads, receiveThreadsActionCreator } from './action'

import { hideLoading, showLoading } from 'react-redux-loading-bar'

const api = {
  getAllThreads
}

const fakeThreadsResponse = [
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

describe('asyncThreads thunk', () => {
  beforeEach(() => {
    api._getAllThreads = api.getAllThreads
  })

  afterEach(() => {
    api.getAllThreads = api._getAllThreads

    delete api._getAllThreads
  })

  it('should dispatch action correctly when data fetching success', async () => {
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse)
    const dispatch = vi.fn()
    await asyncGetAllThreads()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining(
        {
          type: 'loading-bar/SHOW',
          payload: expect.objectContaining({
            scope: 'default'
          })
        },
        expect.objectContaining({
          payload: receiveThreadsActionCreator(fakeThreadsResponse).payload
        })
      )
    )
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: 'RECEIVE_THREADS'
      })
    )
    expect(dispatch).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        type: 'loading-bar/HIDE',
        payload: expect.objectContaining(
          {
            scope: 'default'
          },
          expect.objectContaining({
            payload: receiveThreadsActionCreator(fakeThreadsResponse).payload
          })
        )
      })
    )
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})
