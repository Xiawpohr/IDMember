import instance, { mock } from './base.js'

mock.onPost('/signup').reply(200, {
  registeredUser: { id: 1, email: 'test@example.com', token: 'foufhaeog' }
})

mock.onPost('/login').reply(200, {
  authenticatedUser: { id: 1, email: 'test@example.com', token: 'foufhaeog' }
})

mock.onPost('/logout').reply(200)

export default {
  signup(auth) {
    return instance
      .post('/signup', { ...auth })
      .then(response => response.data.registeredUser)
  },
  login(auth) {
    return instance
      .post('/login', { ...auth })
      .then(response => response.data.authenticatedUser)
  },
  logout() {
    return instance.post('/logout')
  }
}
