import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import LoadingBar from 'react-redux-loading-bar'

const MainLayout = () => {
  return (
    <div>
      <Header />
      <LoadingBar />
      <div className='h-screen bg-[#F5F5F7]'>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
