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
    isLast: false
  },
  remove: {
    status: 'INIT',
    error: -1
  }
};

export default function drama(state, action) {
  if(typeof state === "undefined") {
    state = initialState;
  }
  switch(action.type) {
    /* DRAMA ADD */
    case types.DRAMA_ADD:
      return update(state, {
        add: {
          status: { $set: 'WAITING' },
          error: { $set: -1 }
        }
      });
    case types.DRAMA_ADD_SUCCESS:
      return update(state, {
        add: {
          status: { $set: 'SUCCESS' }
        }
      });
    case types.DRAMA_ADD_FAILURE:
      console.log(action.error);
      return update(state, {
        status: { $set: 'FAILURE'},
        error: { $set: action.error }
      });
    /* DRAMA LIST */
    case types.DRAMA_LIST:
      return update(state, {
        list: {
          status: { $set: 'WAITING' }
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
        });
      } else {
        if(action.listType === 'new') {
          return update(state, {
            list: {
              status: { $set: 'SUCCESS' },
              data: { $unshift: action.data },
            }
          });
        } else {
          return update(state, {
            list: {
              status: { $set: 'SUCCESS' },
              data: { $push: action.data },
              isLast: { $set: action.data.length < 6 }
            }
          });
        }
      }
      return state;
    case types.DRAMA_LIST_FAILURE:
      return update(state, {
        list: {
          status: { $set: 'FAILURE' }
        }
      })
    /* DRAMA REMOVE */
    case types.DRAMA_REMOVE:
      return update(state, {
        remove: {
          status: { $set: 'WAITING' },
          error: { $set: '-1' }
        }
      });
    case types.DRAMA_REMOVE_SUCCESS:
      return update(state, {
        remove: {
          status: { $set: 'SUCCESS' }
        },
        list: {
          data: { $splice: [[action.index, 1]] }
        }
      });
    case types.DRAMA_REMOVE_FAILURE:
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
