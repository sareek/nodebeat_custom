 // import axios from 'axios';
import { TEST_DISPATCH } from './types'
// import setAuthToken from '../utils/setAuthToken';
// import jwt_decode from 'jwt-decode';

// import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
// export const registerUser = (userData, history) => dispatch => {
//   axios
//     .post('/api/users/register', userData)
//     .then(res => history.push('/login'))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };


export const registerUser = (userData) => dispatch => {
     console.log(userData);
     return {
         type:  TEST_DISPATCH,
         payload: userData
     };
  };


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

