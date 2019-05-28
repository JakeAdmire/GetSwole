import { addUser, isLoading, hasError } from '../Actions'

export const addUserThunk = (name) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const url = `https://warm-cove-89223.herokuapp.com/api/v1/users`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({name}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error (response.statusText)
      }
      const user = await response.json()
      const userObject = {
        id: user.user.data.id,
        name
    }
      dispatch(isLoading(false))
      dispatch(addUser(userObject))
    } catch (error) {
      dispatch(hasError(error.message))
    }
  }
}