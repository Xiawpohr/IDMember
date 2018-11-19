import instance, { mock } from './base.js'

mock.onGet('/users').reply(200, {
  users: [{ name: 'Arthur' }, { name: 'Robert' }, { name: 'Charlie' }]
})

mock.onGet('/currentUser').reply(200, {
  currentUser: { id: 1, firstName: 'Arthur', lastName: 'Hsiao' }
})

mock.onPost(/\/users\/\d+/).reply(200, {
  user: { id: 1, firstName: 'Arthur', lastName: 'Hsiao' }
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
