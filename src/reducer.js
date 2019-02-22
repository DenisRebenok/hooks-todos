import uuidv4 from 'uuid/v4';

export default function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_TODOS':
      const todos = [];
      for (const key in payload) {
        todos.push({
          complete: payload[key].complete,
          id: payload[key].id,
          text: payload[key].text,
          uid: key
        });
      }
      // console.log(todos);
      return {
        ...state,
        todos: todos
      };
    case 'ADD_TODO':
      // if (!payload || todos.findIndex(t => t.text === payload) > -1)
      //   return state;
      return {
        ...state,
        todos: [
          ...state.todos,
          { complete: false, id: uuidv4(), text: payload }
        ]
      };
    case 'TOGGLE_TODO':
      const toggleTodos = state.todos.map(t =>
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
      if (!payload || state.todos.findIndex(t => t.text === payload) > -1)
        return state;
      const updatedTodo = { ...state.currentTodo, text: payload };
      const updatedTodoIndex = state.todos.findIndex(
        t => t.id === state.currentTodo.id
      );
      const updatedTodos = [
        ...state.todos.slice(0, updatedTodoIndex),
        updatedTodo,
        ...state.todos.slice(updatedTodoIndex + 1)
      ];
      return {
        ...state,
        currentTodo: {},
        todos: updatedTodos
      };
    case 'REMOVE_TODO':
      const newTodos = state.todos.filter(t => t.id !== payload.id);
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
