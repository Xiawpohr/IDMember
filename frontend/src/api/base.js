import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const port = 3000
const instance = axios.create({
  baseURL: `localhost:${port}/api/`,
  timeout: 1000,
  withCredentials: true
})
const mock = new MockAdapter(instance)

export { instance as default, mock }
