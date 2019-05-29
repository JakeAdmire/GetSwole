export const selectedRoutineReducer = (state = {}, action) => {

  switch (action.type) {

    case 'SET_SELECTED_ROUTINE':
      return action.routine;

    default:
      return state
  }
}