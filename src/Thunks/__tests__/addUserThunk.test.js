import * as actions from '../../Actions'
import { addUserThunk } from '../addUserThunk'

describe('addUserThunk', () => {

  let mockUser
  let mockDispatch

  beforeEach(() => {
    mockUser = { name: "John" }
    mockDispatch = jest.fn()
  })

  it('should dispatch isLoading(true)', async () => {
    const thunk = addUserThunk(mockUser.name)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(actions.isLoading(true))
  })
})