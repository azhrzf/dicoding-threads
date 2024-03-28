import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import Login from './Login'
import store from '@/states'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

expect.extend(matchers)

describe('Login component', () => {
  it('should handle email typing correctly', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    )
    const emailInput = document.getElementById('email')
    await userEvent.type(emailInput, 'email@email.com')
    expect(emailInput).toHaveValue('emailz@email.com')
  })
})

describe('Login component', () => {
  it('should handle password typing correctly', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    )
    const passwordInput = document.getElementById('password')
    await userEvent.type(passwordInput, 'password')
    expect(passwordInput).toHaveValue('password')
  })
})
