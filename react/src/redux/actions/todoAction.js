import api from '../api/api';
import { TODO_LIST, USER_DETAILS } from '../api/apiEndPoint';
//v1/login/

export const todoList = () => async dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(setLoading(true));
    api
      .get(TODO_LIST)
      .then((response, error) => {
        dispatch(todoDataList(response));
        dispatch(setLoading(false));
        resolve(response);
      })
      .catch(error => {
        dispatch(setLoading(false));
        reject(error);
      });
  });
};

export const selectToDo = data => dispatch => {
  dispatch(selectTodoList(data));

};

export const getSelectToDoData = id => dispatch => {
  return new Promise((resolve, reject) => {
    const path = USER_DETAILS + `/${id}`
    api
      .get(path)
      .then((response, error) => {
        dispatch(selectedTodoData(response));
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};


export function setLoading(status) {
  return {
    status,
    type: 'SET_LOADING',
  };
}

export function todoDataList(payload) {
  return {
    type: 'TODO_DATA',
    todoData: payload,
  };
}

export function selectTodoList(payload) {
  return {
    type: 'SELECTED_TODO_LIST',
    selectedTodoListData: payload,
  };
}


export function selectedTodoData(payload) {
  return {
    type: 'SELECTED_TODO_DATA',
    selectedTodoApiData: payload,
  };
}