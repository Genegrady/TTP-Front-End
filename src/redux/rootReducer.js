const initialState={
  state:{
    user: {}
  }
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      // debugger
      return {...state, user: action.payload};
    case 'CLEAR_USER':
      return {...state, user: {}};
    default:
      return state;
  }
};