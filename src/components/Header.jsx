import React from 'react' // Import the 'React' module
import { Separator } from '@/components/ui/separator'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { asyncSetLogout } from '@/states/login/action'

const Header = () => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)
  const navigate = useNavigate()
  const LogStatus = () => {
    if (login.token) {
      return (
        <div>
          <Button
            variant='link'
            onClick={() => {
              Cookies.remove('token')
              dispatch(asyncSetLogout())
              navigate('/')
            }}
            className='px-0'
          >
            Logout
          </Button>
          <Link to='/new'>
            <Button variant='link'>Add Thread</Button>
          </Link>
        </div>
      )
    } else {
      return (
        <Link to='login'>
          <Button variant='link' className='px-0'>
            Login
          </Button>
        </Link>
      )
    }
  }

  return (
    <header className='px-3'>
      <nav>
        <div className='max-w-screen-sm mx-auto py-4'>
          <div className='hidden md:flex items-center justify-between'>
            <h1 className='font-semibold text-xl hover:underline'>
              <Link to='/'>Dicoding Forum App</Link>
            </h1>
            <div className='flex items-center space-x-4 mt-2'>
              <Link to='/'>
                <Button variant='link' className='px-0'>
                  Threads
                </Button>
              </Link>
              <Link to='leaderboards'>
                <Button variant='link' className='px-0'>
                  Leaderboards
                </Button>
              </Link>
              <LogStatus />
            </div>
          </div>
          <div className='block md:hidden'>
            <h1 className='font-semibold text-xl'>Dicoding Forum App</h1>
            <div className='flex items-center space-x-4 mt-2'>
              <Link to='/'>
                <Button variant='link' className='px-0'>
                  Threads
                </Button>
              </Link>
              <Link to='leaderboards'>
                <Button variant='link' className='px-0'>
                  Leaderboards
                </Button>
              </Link>
              <LogStatus />
            </div>
          </div>
        </div>
        <Separator />
      </nav>
    </header>
  )
}

export default Header
