import * as actions from '../../Actions'
import { addNewUser } from '../addNewUser'

describe('addNewUser', () => {

  let mockUser
  let mockDispatch

  beforeEach(() => {
    mockUser = { name: "John" }
    mockDispatch = jest.fn()
  })

  it('should dispatch isLoading(true)', () => {
    const thunk = addNewUser(mockUser.name)
    thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(actions.isLoading(true))
  })

  it('should dispatch hasError with a message if the response is not OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong.'
    }))
    const thunk = addNewUser(mockUser.name)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(actions.hasError('Something went wrong.'))
  })

})