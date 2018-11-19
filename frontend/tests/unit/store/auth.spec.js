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

  it('should set pending state for sign up', () => {
    mutations[types.SIGNUP_PENDING](state)
    expect(state.isLoading).toBe(true)
  })

  it('should set state for sign up successfully', () => {
    mutations[types.SIGNUP_SUCCESS](pendingState, authenticatedUser)
    expect(pendingState.isLoading).toBe(false)
    expect(pendingState.id).not.toBe(null)
    expect(pendingState.email).not.toBe(null)
    expect(pendingState.token).not.toBe(null)
  })

  it('should set erroe massenge for sign up unsuccessfully', () => {
    const error = 'There is something wrong.'
    mutations[types.SIGNUP_FAILURE](pendingState, error)
    expect(pendingState.isLoading).toBe(false)
    expect(pendingState.errorMassenge).toBe(error)
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

  it('should set pending state for logout', () => {
    mutations[types.LOGOUT_PENDING](state)
    expect(state.isLoading).toBe(true)
  })

  it('should set state for logout successfully', () => {
    mutations[types.LOGOUT_SUCCESS](pendingState)
    expect(pendingState.isLoading).toBe(false)
    expect(pendingState.id).toBe(null)
    expect(pendingState.email).toBe(null)
    expect(pendingState.token).toBe(null)
  })

  it('should set erroe massenge for logout unsuccessfully', () => {
    const error = 'There is something wrong.'
    mutations[types.LOGOUT_FAILURE](pendingState, error)
    expect(pendingState.isLoading).toBe(false)
    expect(pendingState.errorMassenge).toBe(error)
  })
})

describe('auth actions', () => {
  let commit

  beforeEach(() => {
    commit = jest.fn()
    api.signup = jest.fn()
    api.login = jest.fn()
    api.logout = jest.fn()
  })

  it('should signup user', async () => {
    const auth = { email: 'test@example.com', password: '123456' }
    await actions.signup({ commit }, auth)
    await flushPromises
    expect(api.signup).toHaveBeenCalled()
    expect(commit).toHaveBeenCalledTimes(2)
    expect(commit.mock.calls[0]).toContain(types.SIGNUP_PENDING)
    expect(commit.mock.calls[1]).toContain(types.SIGNUP_SUCCESS)
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

  it('should logout user', async () => {
    await actions.logout({ commit })
    await flushPromises
    expect(api.logout).toHaveBeenCalled()
    expect(commit).toHaveBeenCalledTimes(2)
    expect(commit.mock.calls[0]).toContain(types.LOGOUT_PENDING)
    expect(commit.mock.calls[1]).toContain(types.LOGOUT_SUCCESS)
  })
})
