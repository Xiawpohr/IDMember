import instance, { mock } from './base.js'
import { users, currentUser, modifiedUser } from '@/fixtures/users.js'

mock.onGet('/users').reply(200, {
  users
})

mock.onGet('/currentUser').reply(200, {
  currentUser
})

mock.onPost(/\/users\/\d+/).reply(200, {
  user: modifiedUser
})

export default {
  fetchAll() {
    return instance.get('/users').then(response => response.data.users)
  },
  fetchCurrentUser() {
    return instance
      .get('/currentUser')
      .then(response => response.data.currentUser)
  },
  update(user) {
    return instance
      .post(`/users/${user.id}`, { ...user })
      .then(response => response.data.user)
  }
}
