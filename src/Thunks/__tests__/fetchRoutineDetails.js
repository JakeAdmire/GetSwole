import * as actions from '../../Actions'
import { fetchRoutineDetails } from '../fetchRoutineDetails'

describe('fetchRoutineDetails', () => {

  let mockDispatch
  let mockId
  let mockRoutine = {}

  beforeEach(() => {
    mockDispatch = jest.fn()
    mockId = 1
  })

  it('should dispatch isLoading(true)', () => {
    const thunk = fetchRoutineDetails(mockId)
    thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(actions.isLoading(true))
  })

  it.skip('should dispatch hasError with a message if the response is not OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong.'
    }))
    const thunk = fetchRoutineDetails(mockId)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(actions.hasError('Something went wrong.'))
  })
  
})