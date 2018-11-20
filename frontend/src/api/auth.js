import instance, { mock } from './base.js'

mock
  .onPost('/signup', {
    email: 'test@example.com',
    password: 'Aa=123'
  })
  .reply(200, {
    registeredUser: { id: 1, email: 'test@example.com', token: 'foufhaeog' }
  })

mock
  .onPost('/login', {
    email: 'test@example.com',
    password: 'Aa=123'
  })
  .reply(200, {
    authenticatedUser: { id: 1, email: 'test@example.com', token: 'foufhaeog' }
  })

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
