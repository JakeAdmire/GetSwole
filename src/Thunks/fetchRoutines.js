import { isLoading, setRoutines, hasError } from '../Actions';

export const fetchRoutines = (date, user) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const url = `https://warm-cove-89223.herokuapp.com/api/v1/my_routines?date=${date}&id=${user.id}`;
      const response = await fetch(url);
      if (!response.ok) throw Error(response.statusText);
      const routines = await response.json();
      dispatch(isLoading(false));
      dispatch(setRoutines(routines))
    } catch(error) {
      dispatch(hasError(error.message));
    }
  }

}

export default fetchRoutines