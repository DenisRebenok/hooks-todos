import uuidv4 from 'uuid/v4';

export default function reducer(state, action) {
  const { type, payload } = action;
  const { todos } = state;
  switch (type) {
    case 'ADD_TODO':
      if (!payload || todos.findIndex(t => t.text === payload) > -1)
        return state;
      const newTodo = {
        id: uuidv4(),
        text: payload,
        complete: false
      };
      return {
        ...state,
        todos: [...todos, newTodo]
      };
    case 'TOGGLE_TODO':
      const toggleTodos = todos.map(t =>
        t.id === payload.id ? { ...payload, complete: !payload.complete } : t
      );
      return {
        ...state,
        todos: toggleTodos
      };
    case 'SET_CURRENT_TODO':
      return {
        ...state,
        currentTodo: payload
      };
    case 'UPDATE_TODO':
      if (!payload || todos.findIndex(t => t.text === payload) > -1)
        return state;
      const updatedTodo = { ...state.currentTodo, text: payload };
      const updatedTodoIndex = todos.findIndex(
        t => t.id === state.currentTodo.id
      );
      const updatedTodos = [
        ...todos.slice(0, updatedTodoIndex),
        updatedTodo,
        ...todos.slice(updatedTodoIndex + 1)
      ];
      return {
        ...state,
        currentTodo: {},
        todos: updatedTodos
      };
    case 'REMOVE_TODO':
      const newTodos = todos.filter(t => t.id !== payload.id);
      const isRemovedTodo =
        state.currentTodo.id === payload.id ? {} : state.currentTodo;
      return {
        ...state,
        currentTodo: isRemovedTodo,
        todos: newTodos
      };
    default:
      return state;
  }
}
