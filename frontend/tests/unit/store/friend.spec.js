import flushPromises from 'flush-promises'
import store from '@/store/friend.js'
import * as types from '@/store/mutationTypes'
import api from '@/api/friend.js'

jest.mock('@/api/friend.js')

const { state: initialState, mutations, actions } = store
const friends = [{ name: 'Arthur' }, { name: 'Robert' }, { name: 'Charlie' }]

describe('friend mutations', () => {
  let state, pendingState

  beforeEach(() => {
    state = { ...initialState }
    pendingState = { ...initialState, isFetchingAll: true }
  })

  it('should set pending state for fetching friends', () => {
    mutations[types.FETCH_FRIENDS_PENDING](state)
    expect(state.isFetchingAll).toBe(true)
  })

  it('should set state for fetching friends successfully', () => {
    mutations[types.FETCH_FRIENDS_SUCCESS](pendingState, friends)
    expect(pendingState.isFetchingAll).toBe(false)
    expect(pendingState.friends).toEqual(friends)
  })

  it('should set error massenge for fetching friends unsuccessfullly', () => {
    const error = 'There is something wrong.'
    mutations[types.FETCH_FRIENDS_FAILURE](pendingState, error)
    expect(pendingState.isFetchingAll).toBe(false)
    expect(pendingState.errorMassenge).toBe(error)
  })
})

describe('friend actions', () => {
  let commit

  beforeEach(() => {
    commit = jest.fn()
    api.fetchAll = jest.fn().mockResolvedValue(friends)
  })

  it('should fetch friends', async () => {
    await actions.fetchAll({ commit })
    await flushPromises()
    expect(api.fetchAll).toHaveBeenCalled()
    expect(commit.mock.calls.length).toBe(2)
    expect(commit.mock.calls[0]).toContain(types.FETCH_FRIENDS_PENDING)
    expect(commit.mock.calls[1]).toContain(types.FETCH_FRIENDS_SUCCESS)
  })
})
