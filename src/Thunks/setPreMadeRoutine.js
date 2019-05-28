import { isLoading, hasError, addPreMadeRoutine } from '../Actions'

export const setPreMadeRoutine = (routine, date, user) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const url = `https://warm-cove-89223.herokuapp.com/api/v1/my_routines`
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          routine_id: routine.id,
          date: date,
          user_id: user.id,
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const premadeRoutine = await response.json()
      dispatch(isLoading(false))
      dispatch(addPreMadeRoutine(premadeRoutine))
    } catch (error) {
      dispatch(hasError(error.message))
    }

  }
}