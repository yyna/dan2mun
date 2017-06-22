import {
  DRAMA_ADD,
  DRAMA_ADD_SUCCESS,
  DRAMA_ADD_FAILURE,
  DRAMA_LIST,
  DRAMA_LIST_SUCCESS,
  DRAMA_LIST_FAILURE
} from './ActionTypes';

import axios from 'axios';

/*============================================================================
  drama
==============================================================================*/

/* DRAMA ADD */
export function dramaAddRequest(title, director) {
  return (dispatch) => {
    // inform drama api is starting
    dispatch(dramaAdd());

    return axios.post('/api/drama/add', {title, director})
    .then((response) => {
      dispatch(dramaAddSuccess());
    }).catch((error) => {
      dispatch(dramaAddFailure(error.response.data.code));
    });
  };
}

export function dramaAdd() {
  return {
    type: DRAMA_ADD
  };
}

export function dramaAddSuccess() {
  return {
    type: DRAMA_ADD_SUCCESS
  };
}

export function dramaAddFailure(error) {
  return {
    type: DRAMA_ADD_FAILURE,
    error
  };
}

/* DRAMA LIST */
/*
  Parameter:
    - isInitial:  whether it is for initial loading
    - listType:   OPTIONAL; loading 'old' drama or 'new' drama
    - id:         OPTIONAL; drama id (one at the bottom or one at the top)
    - title:      OPTIONAL; find dramas of following title
*/
export function dramaListRequest(isInitial, listType, id, title) {
  return (dispatch) => {
    // inform drama list API is starting
    dispatch(dramaList());

    let url = '/api/drama';

    /* url setup depending on parameters,
      to  be implemented.. */

    return axios.get(url)
    .then((response) => {
      dispatch(dramaListSuccess(response.data, isInitial, listType));
    }).catch((error) => {
      dispatch(dramaListFailure());
    });
  };
}

export function dramaList() {
  return {
    type: DRAMA_LIST
  };
}

export function dramaListSuccess(data, isInitial, listType) {
  return {
    type: DRAMA_LIST_SUCCESS,
    data,
    isInitial,
    listType
  };
}

export function dramaListFailure() {
  return {
    type: DRAMA_LIST_FAILURE
  };
}
