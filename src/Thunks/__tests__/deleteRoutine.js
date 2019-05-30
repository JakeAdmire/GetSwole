import * as actions from '../../Actions'
import { deleteRoutine } from '../deleteRoutine'

describe('deleteRoutine', () => {

  let mockUser
  let mockDispatch
  let mockRoutineId
  let mockDate

  beforeEach(() => {
    mockRoutineId = 10
    mockDate = '2019-05-29'
    mockUser = { name: "John" }
    mockDispatch = jest.fn()
  })

  it('should dispatch isLoading(true)', () => {
    const thunk = deleteRoutine(mockUser.name)
    thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(actions.isLoading(true))
  })

  it('should dispatch hasError with a message if the response is not OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong.'
    }))
    const thunk = deleteRoutine(mockUser.name)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(actions.hasError('Something went wrong.'))
  })

})
