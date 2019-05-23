export const dateReducer = (state = '', action) => {
  switch (action.type) {

    case 'ADD_DATE_TO_STORE':
      return action.date;

    default:
      return state
  }
}