import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  add: {
    status: 'INIT',
    error: -1
  },
  list: {
    status: 'INIT',
    data: [],
    error: -1
  },
  remove: {
    status: 'INIT',
    error: -1
  }
}

export default function errors(state, action) {
  if(typeof state === "undefined") {
    state = initialState;
  }

  switch(action.type) {
    /* ERROR ADD */
    case types.ERROR_ADD:
      return update(state, {
        add: {
          status: { $set: 'WAITING'},
          error: { $set: -1 }
        }
      });
    case types.ERROR_ADD_SUCCESS:
      return update(state, {
        add: {
          status: { $set: 'SUCCESS' },
        }
      });
    case types.ERROR_ADD_FAILURE:
      return update(state, {
        add: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    /* ERROR VIEW */
    case types.ERROR_LIST:
      return update(state, {
        list: {
          status: { $set: 'WAITING'}
        }
      });
    case types.ERROR_LIST_SUCCESS:
      return update(state, {
        list: {
          status: { $set: 'SUCCESS' },
          data: { $set: action.data }
        }
      });
    case types.ERROR_LIST_FAILURE:
      return update(state, {
        list: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    /* ERROR REPORT REMOVE */
    case types.ERROR_REMOVE:
      return update(state, {
        remove: {
          status: { $set: 'WAITING' },
          error: { $set: -1 }
        }
      });
    case types.ERROR_REMOVE_SUCCESS:
      return update(state, {
        remove: {
          status: { $set: 'SUCCESS' }
        },
        list: {
          data: { $splice: [[action.index, 1]] }
        }
      });
    case types.ERROR_REMOVE_FAILURE:
      return update(state, {
        remove: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });

    default:
      return state;
  }
}
