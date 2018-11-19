import instance, { mock } from './base.js'

mock.onGet('/users').reply(200, {
  users: [{ name: 'Arthur' }, { name: 'Robert' }, { name: 'Charlie' }]
})

export default {
  fetchAll() {
    return instance.get('/users').then(response => response.data.users)
  }
}
