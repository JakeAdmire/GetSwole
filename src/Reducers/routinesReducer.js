export const routinesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ROUTINES':
      return action.routines;
    default:
      return state;
  }
}