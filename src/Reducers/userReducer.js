export const userReducer = (state = '', action) => {
  switch(action.type) {
    case 'ADD_USER':
      return action.name;
    default:
      return state;
  }
};