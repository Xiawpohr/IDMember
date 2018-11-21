import instance, { mock } from './base.js'
import { users } from '@/fixtures/users.js'

mock.onGet('/friends').reply(200, {
  friends: users
})

mock.onPost('/friends', { friendId: 2 }).reply(200, {
  newFriend: { name: 'Arthur' }
})

export default {
  fetchAll() {
    return instance.get('/friends').then(response => response.data.friends)
  },
  create(friendId) {
    return instance
      .post('/friends', { friendId })
      .then(response => response.data.newFriend)
  }
}
