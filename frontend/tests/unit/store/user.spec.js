import flushPromises from 'flush-promises'
import store from '@/store/user.js'
import * as types from '@/store/mutationTypes'
import api from '@/api/user.js'

jest.mock('@/api/user.js')

const { state: initialState, mutations, actions } = store
const users = [{ name: 'Arthur' }, { name: 'Robert' }, { name: 'Charlie' }]
const user = { id: 1, firstName: 'Arthur', lastName: 'Hsiao' }

describe('user mutations', () => {
  let state, pendingState

  beforeEach(() => {
    state = { ...initialState }
    pendingState = {
      ...initialState,
      isFetchAllUsers: true,
      isSaving: true
    }
  })

  it('should set pending state for fetching users', () => {
    mutations[types.FETCH_USERS_PENDING](state)
    expect(state.isFetchingAllUsers).toBe(true)
  })

  it('should set state for fetching users successfully', () => {
    mutations[types.FETCH_USERS_SUCCESS](pendingState, users)
    expect(pendingState.isFetchingAllUsers).toBe(false)
    expect(pendingState.users).toEqual(users)
  })

  it('should set error massenge for fetching users unsuccessfullly', () => {
    const error = 'There is something wrong.'
    mutations[types.FETCH_USERS_FAILURE](pendingState, error)
    expect(pendingState.isFetchingAllUsers).toBe(false)
    expect(pendingState.errorMassenge).toBe(error)
  })

  it('should set pending state for fetching current user', () => {
    mutations[types.FETCH_CURRENT_USER_PENDING](state)
    expect(state.isFetchingCurrentUser).toBe(true)
  })

  it('should set state for fetching current user successfully', () => {
    mutations[types.FETCH_CURRENT_USER_SUCCESS](pendingState, user)
    expect(pendingState.isFetchingCurrentUser).toBe(false)
    expect(pendingState.currentUser).toEqual(user)
  })

  it('should set error massenge for fetching current user unsuccessfullly', () => {
    const error = 'There is something wrong.'
    mutations[types.FETCH_CURRENT_USER_FAILURE](pendingState, error)
    expect(pendingState.isFetchingCurrentUser).toBe(false)
    expect(pendingState.errorMassenge).toBe(error)
  })

  it('should set pending state for saving user', () => {
    mutations[types.SAVE_USER_PENDING](state)
    expect(state.isSaving).toBe(true)
  })

  it('should set state for saving user successfully', () => {
    mutations[types.SAVE_USER_SUCCESS](pendingState, user)
    expect(pendingState.isSaving).toBe(false)
    expect(pendingState.currentUser).toEqual(user)
  })

  it('should set error massenge for saving user unsuccessfullly', () => {
    const error = 'There is something wrong.'
    mutations[types.SAVE_USER_FAILURE](pendingState, error)
    expect(pendingState.isSaving).toBe(false)
    expect(pendingState.errorMassenge).toBe(error)
  })
})

describe('user actions', () => {
  let commit, state

  beforeEach(() => {
    state = {
      currentUser: {}
    }
    commit = jest.fn()
    api.fetchAll = jest.fn().mockResolvedValue(users)
    api.fetchCurrentUser = jest.fn().mockResolvedValue(user)
    api.update = jest.fn().mockResolvedValue(user)
  })

  it('should fetch users', async () => {
    await actions.fetchUsers({ commit })
    await flushPromises()
    expect(api.fetchAll).toHaveBeenCalled()
    expect(commit.mock.calls.length).toBe(2)
    expect(commit.mock.calls[0]).toContain(types.FETCH_USERS_PENDING)
    expect(commit.mock.calls[1]).toContain(types.FETCH_USERS_SUCCESS)
  })

  it('should fetch current user', async () => {
    await actions.fetchCurrentUser({ commit })
    await flushPromises()
    expect(api.fetchCurrentUser).toHaveBeenCalled()
    expect(commit.mock.calls.length).toBe(2)
    expect(commit.mock.calls[0]).toContain(types.FETCH_CURRENT_USER_PENDING)
    expect(commit.mock.calls[1]).toContain(types.FETCH_CURRENT_USER_SUCCESS)
  })

  it('should save user', async () => {
    await actions.saveUser({ commit, state }, user)
    await flushPromises()
    expect(api.update).toHaveBeenCalled()
    expect(commit.mock.calls.length).toBe(2)
    expect(commit.mock.calls[0]).toContain(types.SAVE_USER_PENDING)
    expect(commit.mock.calls[1]).toContain(types.SAVE_USER_SUCCESS)
  })
})
