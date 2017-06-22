import authentication from './authentication';
import drama from './drama';
import error from './error';

import { combineReducers } from 'redux';

export default combineReducers({
  authentication,
  drama,
  error
});
