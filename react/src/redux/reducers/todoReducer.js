const initialState = {
  todoData: [],
  selectedTodoListData: null,
  selectedTodoApiData: null,
  isLoading: false,
};

const todoData = (state = initialState, action) => {
  switch (action.type) {
    case 'TODO_DATA':
      return { ...state, todoData: action.todoData };
    case 'SELECTED_TODO_LIST':
      return { ...state, selectedTodoListData: action.selectedTodoListData };
    case 'SELECTED_TODO_DATA':
      return { ...state, selectedTodoApiData: action.selectedTodoApiData };
    case 'SET_LOADING':
      return { ...state, isLoading: action.status };
    default:
      return state;
  }
};

export default todoData;
