export const dateReducer = (state = '', action) => {
  switch (action.type) {

    case 'SET_DATE':
      return action.date;

    default:
      return state
  }
}