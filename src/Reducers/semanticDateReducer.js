export const semanticDateReducer = (state = '', action) => {
  switch (action.type) {

    case 'SET_SEMANTIC_DATE':
      return action.date;

    default:
      return state
  }
}