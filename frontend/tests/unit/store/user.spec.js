import flushPromises from 'flush-promises'
import store from '@/store/user.js'
import * as types from '@/store/mutationTypes'
import api from '@/api/user.js'

jest.mock('@/api/user.js')

const { state: initialState, mutations, actions } = store
const users = [{ name: 'Arthur' }, { name: 'Robert' }, { name: 'Charlie' }]

describe('user mutations', () => {
  let state, pendingState

  beforeEach(() => {
    state = { ...initialState }
    pendingState = { ...initialState, isFetchAllUsers: true }
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
})

describe('user actions', () => {
  let commit

  beforeEach(() => {
    commit = jest.fn()
    api.fetchAll = jest.fn().mockResolvedValue(users)
  })

  it('should fetch users', async () => {
    await actions.fetchUsers({ commit })
    await flushPromises()
    expect(api.fetchAll).toHaveBeenCalled()
    expect(commit.mock.calls.length).toBe(2)
    expect(commit.mock.calls[0]).toContain(types.FETCH_USERS_PENDING)
    expect(commit.mock.calls[1]).toContain(types.FETCH_USERS_SUCCESS)
  })
})
