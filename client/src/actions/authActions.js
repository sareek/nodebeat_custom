import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';
import { TEST_DISPATCH } from './types'
import { GET_ERRORS, SET_CURRENT_USER } from './types'
// import setAuthToken from '../utils/setAuthToken';
// import jwt_decode from 'jwt-decode';

// import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User Thunk middleware comes in here
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/user', userData)
    // .post('https://jsonplaceholder.typicode.com/posts', userData)
    .then(res => {
      history.push('/login');


      console.log('lekh', res.data)

    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login- get user token

export const loginUser = (userData) => dispatch => {
  axios.post('/api/auth', userData)
    .then(res => {
      console.log('inside authAction response', userData)
      //save to localStorage
      const { token } = res.data;
      console.log('inside authAction response for token', token);
      //set token to local storage
      localStorage.setItem('jwtToken', token);
      //Set token to Auth header
      setAuthToken(token);
      //Decode token to get user_data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));


    })
    .catch((err) => {

      dispatch({

        type: GET_ERRORS,
        payload: err.response.data
      });
      console.log("checking login error case",err.response.data)
    }
     


    );

};

//Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}


// export const registerUser = (userData) => {
//      console.log('userdataaa',use rData);
//      return {
//          type:  TEST_DISPATCH,
//          payload: userData
//      };
//   };


// export default function(state = initialState, action) {
//       switch(action.type) {

//           case TEST_DISPATCH:
//             return {
//                 ...state,
//                 user: action.payload
//             }

//           default:
//              return state;
//       }
//   }

