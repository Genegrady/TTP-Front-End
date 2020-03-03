const initialState={
  state:{
    user: {}
  }
}


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_USER':
      // debugger
      return {...state, user: payload};
    case 'CLEAR_USER':
      return {...state, user: {}};
    default:
      return state;
  }
};