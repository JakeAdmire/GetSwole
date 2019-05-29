import { isLoading, hasError } from '../Actions'

export const deleteRoutine = (user, routineId, date) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const url = `https://warm-cove-89223.herokuapp.com/api/v1/my_routines?routine_id=${routineId}&user_id=${user.id}&date=${date}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json' 
        }
      })
      if (!response.ok) {
        throw new Error(error.statusText)
      }
      dispatch(isLoading(false))
    } catch (error) {
      dispatch(hasError(error.message))
    }
  }
}

