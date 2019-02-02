// import { combinedReducers } from 'redux';
// import combineReducers from '../../store/reducers';
// import authReducer from './authReducer';

// export default combinedReducers({
//  auth: authReducer
// });

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';


export default combineReducers({
  auth: authReducer,
  errors:errorReducer
 
});

 