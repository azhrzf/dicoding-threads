import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest'
import { getAllLeaderboards } from '@/utils/api'
import {
  asyncGetAllLeaderboards,
  receiveLeaderboardsActionCreator
} from './action'

import { hideLoading, showLoading } from 'react-redux-loading-bar'

const api = {
  getAllLeaderboards
}

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'user-mQhLzINW_w5TxxYf',
      name: 'Dimas Saputra',
      email: 'dimas@dicoding.com',
      avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
    },
    score: 25
  },
  {
    user: {
      id: 'user-S5Eyi_i0PpQbHlqz',
      name: 'aa@ada.com',
      email: 'aa@ada.com',
      avatar: 'https://ui-avatars.com/api/?name=aa@ada.com&background=random'
    },
    score: 5
  }
]

describe('asyncLeaderboards thunk', () => {
  beforeEach(() => {
    api._getAllLeaderboards = api.getAllLeaderboards
  })

  afterEach(() => {
    api.getAllLeaderboards = api._getAllLeaderboards

    delete api._getAllLeaderboards
  })

  it('should dispatch action correctly when data fetching success', async () => {
    api.getAllLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse)
    const dispatch = vi.fn()
    await asyncGetAllLeaderboards()(dispatch)

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
          payload: receiveLeaderboardsActionCreator(fakeLeaderboardsResponse)
            .payload
        })
      )
    )
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: 'RECEIVE_LEADERBOARDS'
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
            payload: receiveLeaderboardsActionCreator(fakeLeaderboardsResponse)
              .payload
          })
        )
      })
    )
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})
