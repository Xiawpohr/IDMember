import instance, { mock } from './base.js'
import { users } from '@/fixtures/users.js'

mock.onGet('/friends').reply(200, {
  friends: [users[8], users[7], users[6], users[5]]
})

mock.onGet('/friends/requests').reply(200, {
  friendRequests: [
    {
      id: 1123,
      to: users[users.length - 1].id
    }
  ]
})

mock.onGet('/friends/confirmations').reply(200, {
  friendConfirmations: [
    {
      id: 1123,
      from: users[0].id
    }
  ]
})

mock.onPost('/friends/request').reply(200, {
  friend: { id: 2, name: 'Arthur' }
})

mock.onPost('/friends/confirm').reply(200, {
  friend: users[0]
})

export default {
  fetchAll() {
    return instance.get('/friends').then(response => response.data.friends)
  },
  fetchRequests() {
    return instance
      .get('/friends/requests')
      .then(response => response.data.friendRequests)
  },
  fetchConfirmations() {
    return instance
      .get('/friends/confirmations')
      .then(response => response.data.friendConfirmations)
  },
  request(friendId) {
    return instance
      .post('/friends/request', { friendId })
      .then(response => response.data.friend)
  },
  confirm(friendId) {
    return instance
      .post('/friends/confirm', { friendId })
      .then(response => response.data.friend)
  }
}
