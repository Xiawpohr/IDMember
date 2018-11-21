import instance, { mock } from './base.js'
import { users } from '@/fixtures/users.js'

mock.onGet('/friends').reply(200, {
  friends: users
})

mock.onPost('/friends/requests').reply(200, {
  newFriend: { id: 2, name: 'Arthur' }
})

export default {
  fetchAll() {
    return instance.get('/friends').then(response => response.data.friends)
  },
  request(friendId) {
    return instance
      .post('/friends/requests', { friendId })
      .then(response => response.data.newFriend)
  }
}
