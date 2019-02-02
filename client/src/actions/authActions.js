import axios from 'axios';
import { TEST_DISPATCH } from './types'
import { GET_ERRORS } from './types'
// import setAuthToken from '../utils/setAuthToken';
// import jwt_decode from 'jwt-decode';

// import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User Thunk middleware comes in here
export const registerUser = userData => dispatch => {
  axios
    .post('/api/user', userData)
    .then(res => console.log('lekh',res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


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

