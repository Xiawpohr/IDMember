import instance, { mock } from './base.js'

mock
  .onPost('/login', {
    email: 'test@example.com',
    password: '123456'
  })
  .reply(200, {
    authenticatedUser: { id: 1, email: 'test@example.com', token: 'foufhaeog' }
  })

export default {
  login(auth) {
    return instance
      .post('/login', { ...auth })
      .then(response => response.data.authenticatedUser)
  }
}
