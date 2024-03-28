import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ThreadFooter from '@/components/ThreadFooter'
import Comment from '@/components/Comment'
import parser from 'html-react-parser'
import { asyncGetThreadDetail } from '@/states/threadDetail/action'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { countDays } from '@/utils/helpers'
import Cookies from 'js-cookie'
import { asyncSetComment } from '@/states/comment/action'

const ThreadDetail = () => {
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()
  const threadDetail = useSelector(state => state.threadDetail)
  const threadVote = useSelector(state => state.threadVote)
  const comment = useSelector(state => state.comment)
  const token = Cookies.get('token')
  const { threadId } = useParams()

  const commentHandler = event => {
    setNewComment(event.target.value)
  }

  const sendCommentHandler = event => {
    event.preventDefault()
    if (!newComment) return alert('Komentar tidak boleh kosong')
    dispatch(asyncSetComment(threadId, token, newComment))
  }

  useEffect(() => {
    dispatch(asyncGetThreadDetail(threadId))
  }, [dispatch, threadVote, comment])

  return (
    <div className='bg-[#F5F5F7] px-3 py-8'>
      <div className='max-w-screen-sm mx-auto'>
        <Card>
          <div className='p-6 space-y-4'>
            <Button variant='outline'>#{threadDetail.category}</Button>
            <h2 className='text-lg font-semibold'>{threadDetail.title}</h2>
            <div className='overflow-auto break-all'>
              {parser(threadDetail.body || '')}
            </div>
            {threadDetail && Object.keys(threadDetail).length > 0 && (
              <ThreadFooter
                id={threadDetail.id}
                likeCounter={threadDetail.upVotesBy}
                dislikeCounter={threadDetail.downVotesBy}
                commentsCounter={threadDetail.comments}
                daysCounter={countDays(threadDetail.createdAt)}
                creator={threadDetail.owner.name}
              />
            )}
            {token && (
              <form className='space-y-3'>
                <h3 className='text-lg'>Beri Komentar</h3>
                <textarea
                  className='w-full p-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6'
                  placeholder='Tulis komentar anda...'
                  value={newComment}
                  onChange={commentHandler}
                ></textarea>
                <Button
                  size='sm'
                  className='w-full mt-2'
                  onClick={sendCommentHandler}
                >
                  Kirim
                </Button>
              </form>
            )}
            <div className='mt-4 space-y-4'>
              <h3 className='text-lg'>
                Komentar {'('}
                <span className='font-semibold'>
                  {threadDetail && Object.keys(threadDetail).length
                    ? threadDetail.comments.length
                    : 0}
                </span>
                {')'}
              </h3>
              {threadDetail &&
                Object.keys(threadDetail).length > 0 &&
                threadDetail.comments.map(comment => (
                  <Comment
                    key={comment.id}
                    name={comment.owner.name}
                    content={comment.content}
                    avatar={comment.owner.avatar}
                    likeCounter={comment.upVotesBy}
                    dislikeCounter={comment.downVotesBy}
                    countDays={countDays(comment.createdAt)}
                  />
                ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ThreadDetail
