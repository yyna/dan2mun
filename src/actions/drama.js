import {
  DRAMA_ADD,
  DRAMA_ADD_SUCCESS,
  DRAMA_ADD_FAILURE,
  DRAMA_LIST,
  DRAMA_LIST_SUCCESS,
  DRAMA_LIST_FAILURE,
  DRAMA_REMOVE,
  DRAMA_REMOVE_SUCCESS,
  DRAMA_REMOVE_FAILURE
} from './ActionTypes';

import axios from 'axios';

/*============================================================================
  drama
==============================================================================*/

/* DRAMA ADD */
export function dramaAddRequest(title, director, actors, genre, era, king, events, image) {
  return (dispatch) => {
    // inform drama api is starting
    dispatch(dramaAdd());

    return axios.post('/api/drama/', {title, director, actors, genre, era, king, events, image})
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
export function dramaListRequest(isInitial, listType, id, username) {
  return (dispatch) => {
    // inform drama list API is starting
    dispatch(dramaList());

    let url = '/api/drama';

    if(typeof username==="undefined") {
      // username not given, load public drama
      url = isInitial ? url : `${url}/${listType}/${id}`;
      // or url + '/' + listType + '/' +  id
    } else {
      // load drama of specific user
      /* to be implemented */
    }

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

/* DRAMA REMOVE */
export function dramaRemoveRequest(id, index) {
  return (dispatch) => {
    return axios.delete('/api/drama/' + id)
    .then((response) => {
      dispatch(dramaRemoveSuccess(index));
    }).catch((error) => {
      dispatch(dramaRemoveFailure(error.response.data.code));
    });
  };
}

export function dramaRemove() {
  return {
    type: DRAMA_REMOVE
  };
}

export function dramaRemoveSuccess(index) {
  return {
    type: DRAMA_REMOVE_SUCCESS,
    index
  };
}

export function dramaRemoveFailure(error) {
  return {
    type: DRAMA_REMOVE_FAILURE,
    error
  }
}
