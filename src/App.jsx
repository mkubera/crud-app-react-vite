import { nanoid } from "nanoid";
import { useState } from "react";
import "./App.css";

const App = () => {
  const INIT_TODOS = [];
  const [todos, setTodos] = useState(INIT_TODOS);

  const addTodo = (e) => {
    e.preventDefault();

    const { name } = e.currentTarget.elements;
    const newTodo = { id: nanoid(), name: name.value, isEdited: false };

    setTodos((state) => [...state, newTodo]);

    e.currentTarget.reset();
  };

  const deleteTodo = (id) => {
    setTodos((state) => state.filter((todo) => todo.id !== id));
  };

  const toggleIsEdited = (id) => {
    setTodos((state) =>
      state.map((todo) =>
        todo.id === id ? { ...todo, isEdited: !todo.isEdited } : todo
      )
    );
  };

  const editTodo = (id, e) => {
    e.preventDefault();

    const { name } = e.currentTarget.elements;

    setTodos((state) =>
      state.map((todo) =>
        todo.id === id ? { ...todo, name: name.value, isEdited: false } : todo
      )
    );
  };

  return (
    <div className="App">
      <form onSubmit={addTodo}>
        <input type="text" name="name" />
        <button>Add</button>
      </form>
      <ul>
        {todos.map(({ id, name, isEdited }) => (
          <li key={id}>
            {isEdited ? (
              <>
                <form onSubmit={(e) => editTodo(id, e)}>
                  <input type="text" name="name" defaultValue={name} />
                  <button>Confirm</button>
                </form>
                <button onClick={() => toggleIsEdited(id)}>unedit</button>
              </>
            ) : (
              <>
                {name}
                <button onClick={() => toggleIsEdited(id)}>edit</button>
                <button onClick={() => deleteTodo(id)}>x</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
