import authentication from './authentication';
import drama from './drama';

import { combineReducers } from 'redux';

export default combineReducers({
  authentication,
  drama
});
