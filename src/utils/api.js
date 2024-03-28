import axios from 'axios'

const BASE_URL = 'https://forum-api.dicoding.dev/v1'

async function getAllUsers () {
  const response = await axios.get(`${BASE_URL}/users`)
  if (response.status !== 200) {
    throw new Error(response.statusText)
  }
  return response.data.data.users
}

async function getAllThreads () {
  const response = await axios.get(`${BASE_URL}/threads`)
  if (response.status !== 200) {
    throw new Error(response.statusText)
  }

  const users = await getAllUsers()

  return response.data.data.threads.map(thread => {
    return {
      ...thread,
      ownerName: users.find(user => user.id === thread.ownerId).name
    }
  })
}

async function getThreadDetail (threadId) {
  const response = await axios.get(`${BASE_URL}/threads/${threadId}`)
  if (response.status !== 200) {
    throw new Error(response.statusText)
  }
  return response.data.data.detailThread
}

async function getAllLeaderboards () {
  const response = await axios.get(`${BASE_URL}/leaderboards`)
  if (response.status !== 200) {
    throw new Error(response.statusText)
  }
  return response.data.data.leaderboards
}

async function register (name, email, password) {
  const response = await axios.post(`${BASE_URL}/register`, {
    name,
    email,
    password
  })
  if (response.status !== 201) {
    throw new Error(response.statusText)
  }
  return response.data.data.user
}

async function login (email, password) {
  const response = await axios.post(`${BASE_URL}/login`, {
    email,
    password
  })
  if (response.status !== 200) {
    throw new Error(response.statusText)
  }
  return response.data.data
}

async function upVoteThread (threadId, token) {
  const response = await axios.post(
    `${BASE_URL}/threads/${threadId}/up-vote`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  if (response.status !== 201) {
    throw new Error(response.statusText)
  }
  return response.data.data.vote
}

async function downVoteThread (threadId, token) {
  const response = await axios.post(
    `${BASE_URL}/threads/${threadId}/down-vote`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  if (response.status !== 201) {
    throw new Error(response.statusText)
  }
  return response.data.data.vote
}

async function neutralVoteThread (threadId, token) {
  const response = await axios.post(
    `${BASE_URL}/threads/${threadId}/neutral-vote`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  if (response.status !== 201) {
    throw new Error(response.statusText)
  }
  return response.data.data.vote
}

async function ownProfile (token) {
  const response = await axios.get(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (response.status !== 200) {
    throw new Error(response.statusText)
  }
  return {
    token,
    ...response.data.data.user
  }
}

async function newComment (threadId, token, content) {
  const response = await axios.post(
    `${BASE_URL}/threads/${threadId}/comments`,
    {
      content
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  if (response.status !== 201) {
    throw new Error(response.statusText)
  }
  return response.data.data.comment
}

async function newThread (title, body, category, token) {
  const response = await axios.post(
    `${BASE_URL}/threads`,
    {
      title,
      body,
      category
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  if (response.status !== 201) {
    throw new Error(response.statusText)
  }
  return response.data.data.thread
}

export {
  getAllThreads,
  getThreadDetail,
  getAllLeaderboards,
  register,
  login,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  ownProfile,
  newComment,
  newThread
}
