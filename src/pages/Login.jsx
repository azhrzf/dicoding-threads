import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { asyncSetLogin } from '@/states/login/action'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userDatas, setUserDatas] = useState({
    email: '',
    password: ''
  })

  const onChangeHandler = event => {
    setUserDatas({
      ...userDatas,
      [event.target.name]: event.target.value
    })
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    if (!userDatas.email || !userDatas.password) {
      return alert('Email atau password tidak boleh kosong')
    }
    dispatch(asyncSetLogin(userDatas.email, userDatas.password))
    navigate('/')
  }

  return (
    <div className='bg-[#F5F5F7] px-3 pt-5'>
      <div className='max-w-screen-sm mx-auto'>
        <h2 className='text-lg mb-2'>Login</h2>
        <Card>
          <form className='p-6 space-y-4'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  placeholder='email'
                  onChange={onChangeHandler}
                  value={userDatas.email}
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  className='p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
              <div className='mt-2'>
                <input
                  placeholder='password'
                  onChange={onChangeHandler}
                  value={userDatas.password}
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='password'
                  className='p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <Button
              onClick={onSubmitHandler}
              size='sm'
              className='w-full'
              id='button'
            >
              Login
            </Button>
            <p>
              Belum punya akun?{' '}
              <Link to='/register' className='text-blue-800 hover:underline'>
                Daftar di sini
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Login
