import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ThreadFooter from '@/components/ThreadFooter'
import { asyncGetAllThreads } from '@/states/threads/action'
import { countDays } from '@/utils/helpers'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import { asyncGetOwnProfile } from '@/states/login/action'
import Cookies from 'js-cookie'

const Threads = () => {
  const [filterCategory, setFilterCategory] = useState([])
  const dispatch = useDispatch()
  const threads = useSelector(state => state.threads)
  const threadVote = useSelector(state => state.threadVote)

  const filterCategoryHandler = category => {
    setFilterCategory(prevState => {
      if (prevState.includes(category)) {
        return []
      }
      return [category]
    })
  }

  useEffect(() => {
    if (Cookies.get('token')) {
      dispatch(asyncGetOwnProfile(Cookies.get('token')))
    }
    dispatch(asyncGetAllThreads())
  }, [dispatch, threadVote, Cookies.get('token')])

  return (
    <div className='bg-[#F5F5F7] px-3'>
      <div className='max-w-screen-sm mx-auto py-8'>
        <div className='mb-4'>
          <h2 className='text-lg mb-2'>Kategori Populer</h2>
          <div className='grid grid-cols-3 gap-2'>
            {Object.entries(
              threads.reduce((count, obj) => {
                const value = obj.category
                count[value] = (count[value] || 0) + 1
                return count
              }, {})
            )
              .map(([name, value]) => ({ name, value }))
              .map((val, index) => {
                return (
                  <Button
                    key={index}
                    variant={filterCategory.includes(val.name) ? '' : 'outline'}
                    onClick={() => filterCategoryHandler(val.name)}
                  >
                    #{val.name}
                  </Button>
                )
              })}
          </div>
        </div>
        <div className='space-y-3'>
          <h2 className='text-lg'>Diskusi Tersedia</h2>
          {threads
            .filter(
              thread =>
                filterCategory.includes(thread.category) ||
                filterCategory.length === 0
            )
            .map(thread => {
              return (
                <Card key={thread.id}>
                  <CardHeader>
                    <CardTitle>
                      <Link
                        className='text-blue-800 hover:underline'
                        to={`thread/${thread.id}`}
                      >
                        {thread.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='overflow-auto break-all'>
                      {parse(thread.body)}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <ThreadFooter
                      id={thread.id}
                      likeCounter={thread.upVotesBy}
                      dislikeCounter={thread.downVotesBy}
                      commentsCounter={Array.from(
                        { length: thread.totalComments },
                        (_, i) => i
                      )}
                      daysCounter={countDays(thread.createdAt)}
                      creator={thread.ownerName}
                    />
                  </CardFooter>
                </Card>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Threads
