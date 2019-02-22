import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import TodosContext from '../context';

export default function TodoForm() {
  const [todo, setTodo] = useState('');
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(() => {
    setTodo(currentTodo.text ? currentTodo.text : '');
  }, [currentTodo.id]);

  const handleSubmit = async event => {
    event.preventDefault();
    // const actionType = currentTodo.text ? 'UPDATE_TODO' : 'ADD_TODO';
    if (todo === '' || currentTodo.text === todo) {
      setTodo('');
      return false;
    }
    //   return state;
    if (currentTodo.text) {
      const response = await axios.patch(
        `https://todos2-1e502.firebaseio.com/todos/${currentTodo.uid}.json`,
        { text: todo }
      );
      dispatch({ type: 'UPDATE_TODO', payload: response.data });
    } else {
      const response = await axios.post(
        'https://todos2-1e502.firebaseio.com/todos.json',
        {
          id: uuidv4(),
          text: todo,
          complete: false
        }
      );
      console.log(response);
      dispatch({ type: 'ADD_TODO', payload: todo });
    }

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
