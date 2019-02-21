import React, { useState, useEffect, useContext } from 'react';
import TodosContext from '../context';

export default function TodoForm() {
  const [todo, setTodo] = useState('');
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(() => {
    currentTodo.text && setTodo(currentTodo.text);
  }, [currentTodo.id]);

  const handleSubmit = event => {
    event.preventDefault();
    const actionType = currentTodo.text ? 'UPDATE_TODO' : 'ADD_TODO';
    dispatch({ type: actionType, payload: todo });
    setTodo('');
  };
  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        className="border-black border-solid border-2"
        onChange={e => setTodo(e.target.value)}
        value={todo}
      />
    </form>
  );
}
