import { isLoading, hasError, setSelectedRoutine } from '../Actions'

export const fetchRoutineDetails = (id) => {

  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      let url = `https://warm-cove-89223.herokuapp.com/api/v1/routines/${id}`;
      const response = await fetch(url);
      let routine = await response.json();
      dispatch(setSelectedRoutine(routine));
      dispatch(isLoading(false));

    } catch (error) {
      dispatch(hasError(error.message));
    }
  }
}