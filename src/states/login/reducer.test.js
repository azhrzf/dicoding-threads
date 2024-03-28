import { describe, it, expect } from 'vitest'
import loginReducer from './reducer'

describe('logineducers function', () => {
  it('should return the token when given by LOGIN action', () => {
    const initialState = []
    const action = {
      type: 'LOGIN',
      payload: {
        data: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw'
        }
      }
    }
    const nextState = loginReducer(initialState, action)
    expect(nextState).toEqual(action.payload.userDatas)
  })
})

describe('logineducers function', () => {
  it('should return empty object when given by LOGOUT action', () => {
    const initialState = []
    const action = {
      type: 'LOGOUT'
    }
    const nextState = loginReducer(initialState, action)
    expect(nextState).toEqual({})
  })
})
