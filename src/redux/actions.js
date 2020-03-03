const BASE_URL = 'https://stock-back.herokuapp.com';
export const USERS_URL = BASE_URL + '/users';
const PERSIST_URL = BASE_URL + '/auth';
const LOGIN_URL = BASE_URL + '/login';
export const TRANSACTION_URL = `/transactions`
const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;
export const IEX_CLOUD_API_BASE_URL = `https://cloud.iexapis.com/stable/stock/`
export const API_KEY = '/quote?token=' + `pk_364ef2c1afb8442fb7c5235844fcb926`

// console.log(IEX_CLOUD_FETCH_URL)

// Redux Actions

const setUserAction = userObj => ({
  type: 'SET_USER',
  payload: userObj
});

const clearUserAction = () => ({
  type: 'CLEAR_USER'
});

// Fetch

const newUserToDB = userObj => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  };
  fetch(USERS_URL, config)
    .then(r => r.json())
    .then(data => {
      dispatch(setUserAction(data.user));
      localStorage.setItem('token', data.token);
    });
};

const deleteUserFromDB = userId => dispatch => {
  const config = {
    method: 'DELETE'
  };
  fetch(SPECIFIC_USER_URL(userId), config).then(r => {
    dispatch(clearUserAction());
    localStorage.clear();
  });
};

const loginUserToDB = userCredentials => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userCredentials)
  };
  fetch(LOGIN_URL, config)
    .then(r => r.json())
    .then(data => {
      console.log(data)
      dispatch(setUserAction(data.user));
      localStorage.setItem('token', data.token);
    });
};

const persistUser = () => dispatch => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: `bearer ` + localStorage.token
    }
  };
  fetch(PERSIST_URL, config)
    .then(r => r.json())
    .then(userInstance => {
      dispatch(setUserAction(userInstance));
    });
};

const logoutUser = () => dispatch => {
  dispatch(clearUserAction());
  localStorage.clear();
};

export default {
  newUserToDB,
  deleteUserFromDB,
  loginUserToDB,
  persistUser,
  logoutUser
};