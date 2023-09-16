export const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE':
      state = [action.data, ...state];
      localStorage.setItem('diary', JSON.stringify(state));
      return state;
    case 'UPDATE':
      return state;
    case 'DELETE':
      return state;
    default:
      return state;
  }
};
