import flushPromises from 'flush-promises'
import store from '@/store/auth.js'
import * as types from '@/store/mutationTypes'
import api from '@/api/auth.js'

jest.mock('@/api/auth.js')

const { state: initialState, mutations, actions } = store
const authenticatedUser = {
  id: 1,
  email: 'test@example.com',
  token: 'foufhaeog'
}

describe('auth mutations', () => {
  let state, pendingState

  beforeEach(() => {
    state = { ...initialState }
    pendingState = { ...initialState, isLoading: true }
  })

  it('should set pending state for login', () => {
    mutations[types.LOGIN_PENDING](state)
    expect(state.isLoading).toBe(true)
  })

  it('should set state for login successfully', () => {
    mutations[types.LOGIN_SUCCESS](pendingState, authenticatedUser)
    expect(pendingState.isLoading).toBe(false)
    expect(pendingState.id).not.toBe(null)
    expect(pendingState.email).not.toBe(null)
    expect(pendingState.token).not.toBe(null)
  })

  it('should set erroe massenge for login unsuccessfully', () => {
    const error = 'There is something wrong.'
    mutations[types.LOGIN_FAILURE](pendingState, error)
    expect(pendingState.isLoading).toBe(false)
    expect(pendingState.errorMassenge).toBe(error)
  })
})

describe('auth actions', () => {
  let commit

  beforeEach(() => {
    commit = jest.fn()
    api.login = jest.fn()
  })

  it('should login user', async () => {
    const auth = { email: 'test@example.com', password: '123456' }
    await actions.login({ commit }, auth)
    await flushPromises
    expect(api.login).toHaveBeenCalled()
    expect(commit).toHaveBeenCalledTimes(2)
    expect(commit.mock.calls[0]).toContain(types.LOGIN_PENDING)
    expect(commit.mock.calls[1]).toContain(types.LOGIN_SUCCESS)
  })
})