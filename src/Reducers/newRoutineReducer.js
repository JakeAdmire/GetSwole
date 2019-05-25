export const newRoutineReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PREMADE_ROUTINE':
      return action.routine
    default:
      return state
  }
}