import instance, { mock } from './base.js'
import { users } from '@/fixtures/users.js'

mock.onGet('/friends').reply(200, {
  friends: users
})

mock.onGet('/friends/requests').reply(200, {
  friendRequests: [
    {
      id: 1123,
      to: users[users.length - 1].id
    }
  ]
})

mock.onPost('/friends/requests').reply(200, {
  newFriend: { id: 2, name: 'Arthur' }
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
  request(friendId) {
    return instance
      .post('/friends/requests', { friendId })
      .then(response => response.data.newFriend)
  }
}
