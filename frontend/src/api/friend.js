import instance, { mock } from './base.js'

mock.onGet('/friends').reply(200, {
  friends: [{ name: 'Arthur' }, { name: 'Robert' }, { name: 'Charlie' }]
})

export default {
  fetchAll() {
    return instance.get('/friends').then(response => response.data.friends)
  }
}
