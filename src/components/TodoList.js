import React, { useContext } from 'react';
import TodosContext from '../context';
import axios from 'axios';

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext);
  const { todos } = state;
  const title =
    todos && todos.length > 0 ? `${todos.length} Todos` : 'Nothing To Do!';

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold">{title}</h1>
      <ul className="list-reset text-white p-0">
        {todos &&
          todos.map(todo => (
            <li
              className="flex items-center bg-orange-dark border-black border-dashed border-2 my-2 py-4"
              key={todo.id}
            >
              <span
                onDoubleClick={async () => {
                  // console.log(`axios.patch, todo.uid: ${todo.uid}`);
                  await axios.patch(
                    `https://todos2-1e502.firebaseio.com/todos/${
                      todo.uid
                    }.json`,
                    { complete: !todo.complete }
                  );
                  dispatch({ type: 'TOGGLE_TODO', payload: todo });
                  // console.log(`response.data: ${response.data}`);
                }}
                className={`flex-1 ml-12 cursor-pointer ${todo.complete &&
                  'line-through text-grey-darkest'}`}
              >
                {todo.text}
              </span>
              <button
                onClick={() =>
                  dispatch({ type: 'SET_CURRENT_TODO', payload: todo })
                }
              >
                <img
                  src="https://icon.now.sh/edit/0050c5"
                  alt="Edit Icon"
                  className="h6"
                />
              </button>
              <button
                onClick={async () => {
                  // console.log(todos.indexOf(todo));
                  await axios.delete(
                    `https://todos2-1e502.firebaseio.com/todos/${todo.uid}.json`
                  );
                  dispatch({ type: 'REMOVE_TODO', payload: todo });
                }}
              >
                <img
                  src="https://icon.now.sh/delete/8b0000"
                  alt="Delete Icon"
                  className="h6"
                />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
