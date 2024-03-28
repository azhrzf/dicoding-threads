import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { asyncAddThread } from '@/states/threads/action'
import Cookies from 'js-cookie'

const CreateThread = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = Cookies.get('token')

  const [createThread, setCreateThread] = useState({
    title: '',
    body: '',
    category: ''
  })

  const onChangeHandler = event => {
    setCreateThread({
      ...createThread,
      [event.target.name]: event.target.value
    })
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    dispatch(
      asyncAddThread(
        createThread.title,
        createThread.body,
        createThread.category,
        token
      )
    )
    navigate('/')
  }

  return (
    <div className='bg-[#F5F5F7] px-3 pt-5'>
      <div className='max-w-screen-sm mx-auto'>
        <h2 className='text-lg mb-2'>Buat Diskusi Baru</h2>
        <Card>
          <form className='p-6 space-y-4'>
            <div>
              <label
                htmlFor='title'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Judul
              </label>
              <div className='mt-2'>
                <input
                  onChange={onChangeHandler}
                  value={createThread.title}
                  id='title'
                  name='title'
                  type='title'
                  autoComplete='title'
                  className='p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='category'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Kategori
              </label>
              <div className='mt-2'>
                <input
                  onChange={onChangeHandler}
                  value={createThread.category}
                  id='category'
                  name='category'
                  type='category'
                  autoComplete='category'
                  className='p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='body'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Content
              </label>
              <div className='mt-2'>
                <textarea
                  className='w-full p-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6'
                  placeholder='Tulis komentar anda...'
                  value={createThread.body}
                  onChange={onChangeHandler}
                  id='body'
                  name='body'
                  rows='5'
                ></textarea>
              </div>
            </div>
            <Button onClick={onSubmitHandler} size='sm' className='w-full'>
              Buat
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default CreateThread
