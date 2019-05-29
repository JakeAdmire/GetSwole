import * as actions from '../../Actions'
import { addUserThunk } from '../addUserThunk'

describe('addUserThunk', () => {

  let mockUser
  let mockDispatch

  beforeEach(() => {
    mockUser = { name: "John" }
    mockDispatch = jest.fn()
  })

  it('should dispatch isLoading(true)', () => {
    const thunk = addUserThunk(mockUser.name)
    thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(actions.isLoading(true))
  })

  it('should dispatch hasError with a message if the response is not OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong.'
    }))
    const thunk = addUserThunk(mockUser.name)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(actions.hasError('Something went wrong.'))
  })

})