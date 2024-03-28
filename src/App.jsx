import React from 'react' // Import the 'React' module
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './pages/MainLayout'
import Threads from './pages/Threads'
import Leaderboards from './pages/Leaderboards'
import Login from './pages/Login'
import Register from './pages/Register'
import ThreadDetail from './pages/ThreadDetail'
import CreateThread from './pages/CreateThread'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Threads />} />
          <Route path='leaderboards' element={<Leaderboards />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='thread/:threadId' element={<ThreadDetail />} />
          <Route path='new' element={<CreateThread />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
