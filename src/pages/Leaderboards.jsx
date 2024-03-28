import React, { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetAllLeaderboards } from '@/states/leaderboards/action'

const Leaderboards = () => {
  const dispatch = useDispatch()
  const leaderboards = useSelector(state => state.leaderboards)

  useEffect(() => {
    dispatch(asyncGetAllLeaderboards())
  }, [dispatch])

  return (
    <div className='px-3 py-8'>
      <div className='max-w-screen-sm mx-auto'>
        <h2 className='text-lg mb-2'>Klasmen Pengguna Aktif</h2>
        <Card>
          <div className='p-6 space-y-4'>
            <div className=''>
              <div className='flex justify-between items-center'>
                <p>Pengguna</p>
                <p>Skor</p>
              </div>
            </div>
            <div className='space-y-3'>
              {leaderboards.map(leaderboard => (
                <div
                  key={leaderboard.user.id}
                  className='flex justify-between items-center'
                >
                  <div className='flex items-center space-x-3'>
                    <img
                      src={leaderboard.user.avatar}
                      alt={leaderboard.user.name}
                      className='w-8 h-8 rounded-full'
                    />
                    <p className='text-lg'>{leaderboard.user.name}</p>
                  </div>
                  <p>{leaderboard.score}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Leaderboards
