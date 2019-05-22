export const exercisesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EXERCISES':
      return action.exercises
    default:
      return state
  }
}