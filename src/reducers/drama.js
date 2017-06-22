import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  post: {
    status: 'INIT',
    error: -1
  },
  list: {
    status: 'INIT',
    data: [],
    isLast: false
  }
};

export default function drama(state, action) {
  if(typeof state === "undefined") {
    state = initialState;
  }
  switch(action.type) {
    case types.DRAMA_ADD:
      return update(state, {
        post: {
          status: { $set: 'WAITING' },
          error: { $set: -1 }
        }
      });
    case types.DRAMA_ADD_SUCCESS:
      return update(state, {
        post: {
          status: { $set: 'SUCCESS' }
        }
      });
    case types.DRAMA_ADD_FAILURE:
      return update(state, {
        status: { $set: 'FAILURE'},
        error: { $set: action.error }
      });
    case types.DRAMA_LIST:
      return update(state, {
        list: {
          status: { $set: 'WAITING' },
        }
      });
    case types.DRAMA_LIST_SUCCESS:
      if(action.isInitial) {
        return update(state, {
          list: {
            status: { $set: 'SUCCESS' },
            data: { $set: action.data },
            isLast: { $set: action.data.length < 6 }
          }
        })
      }
      // loading older or newer drama
      // to be implemented..
      return state;
    case types.DRAMA_LIST_FAILURE:
      return update(state, {
        list: {
          status: { $set: 'FAILURE' }
        }
      })
    default:
      return state;
  }
}
