import {
  ERROR_ADD,
  ERROR_ADD_SUCCESS,
  ERROR_ADD_FAILURE,
  ERROR_LIST,
  ERROR_LIST_SUCCESS,
  ERROR_LIST_FAILURE,
  ERROR_REMOVE,
  ERROR_REMOVE_SUCCESS,
  ERROR_REMOVE_FAILURE
} from './ActionTypes';

import axios from 'axios';

/*============================================================================
  error
==============================================================================*/

/* ERROR ADD */
export function errorAddRequest(contents) {
  return (dispatch) => {
    // inform error api is starting
    dispatch(errorAdd());

    return axios.post('/api/error/', { contents })
    .then((response) => {
      // SUCCEED
      dispatch(errorAddSuccess());
    }).catch((error) => {
      // FAILURE
      dispatch(errorAddFailure(error.response.data.code));
    });
  };
}

export function errorAdd() {
  return {
    type: ERROR_ADD
  };
}

export function errorAddSuccess() {
  return {
    type: ERROR_ADD_SUCCESS
  };
}

export function errorAddFailure(error) {
  return {
    type: ERROR_ADD_FAILURE,
    error
  };
}

/* ERROR LIST */
export function errorListRequest() {
  return (dispatch) => {
    // inform error api is starting
    dispatch(errorList());

    return axios.get('/api/error/', {})
    .then((response) => {
      // SUCCEED
      dispatch(errorListSuccess(response.data));
    }).catch((error) => {
      // FAILURE
      dispatch(errorAddFailure(error));
    });
  };
}

export function errorList() {
  return {
    type: ERROR_LIST
  };
}

export function errorListSuccess(data) {
  return {
    type: ERROR_LIST_SUCCESS,
    data
  };
}

export function errorListFailure(error) {
  return {
    type: ERROR_LIST_FAILURE,
    error
  };
}

/* ERROR REPORT REMOVE */
export function errorRemoveRequest(id, index) {
  return (dispatch) => {
    dispatch(errorRemove());

    return axios.delete('/api/error/' + id)
    .then((response) => {
      dispatch(errorRemoveSuccess(index));
    }).catch((error) => {
      dispatch(errorRemoveFailure(error.response.data.code));
    })
  }
}

export function errorRemove() {
  return {
    type: ERROR_REMOVE
  };
}

export function errorRemoveSuccess(index) {
  return {
    type: ERROR_REMOVE_SUCCESS,
    index
  };
}

export function errorRemoveFailure(error) {
  return {
    type: ERROR_REMOVE_FAILURE,
    error
  }
}
