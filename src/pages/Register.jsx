import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { asyncSetRegister } from '@/states/register/action'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userDatas, setUserDatas] = useState({
    name: '',
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
    dispatch(
      asyncSetRegister(userDatas.name, userDatas.email, userDatas.password)
    )
    navigate('/login')
  }

  return (
    <div className='bg-[#F5F5F7] px-3 pt-5'>
      <div className='max-w-screen-sm mx-auto'>
        <h2 className='text-lg mb-2'>Register</h2>
        <Card>
          <form className='p-6 space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Name
              </label>
              <div className='mt-2'>
                <input
                  onChange={onChangeHandler}
                  value={userDatas.name}
                  id='name'
                  name='name'
                  type='text'
                  autoComplete='name'
                  className='p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
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
            <Button onClick={onSubmitHandler} size="sm" className="w-full">Register</Button>
            <p>
              Sudah punya akun?{' '}
              <Link to='/login' className='text-blue-800 hover:underline'>
                Login di sini
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Register
