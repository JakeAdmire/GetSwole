import { isLoading, setRoutines } from '../Actions';

export const fetchRoutines = (date) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const url = `https://warm-cove-89223.herokuapp.com/api/v1/my_routines?date=${date}&id=1`;
      const response = await fetch(url);
      if (!response.ok) throw Error(response.statusText);
      const data = await response.json();
      dispatch(isLoading(false));
      dispatch(setRoutines(data))

    } catch(error) {
      console.log(error.message);
    }
  }

}