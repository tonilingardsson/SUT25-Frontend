import { useState, useEffect } from 'react';           // 1) Importera useState från React [web:47]
import './App.css'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState(() => {

    const stored = localStorage.getItem('todos');

    if (!stored) {
      // If there is nothing spared, return this list
      return [
        { id:1, text: "Lära mig React", done:true },
        { id:2, text: "Bygga en todo-app", done:false },
        { id:3, text: "Spara todos i localStorage", done:true },
      ];
    }

    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  );

  function addTodo(text){
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo = {
      id: Date.now(),
      text: trimmed,
      done: false
    };
    
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  function toggleTodo(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // dependency-array: only when todos changes

  return (
    <>

      <h1>My new React App for Petter</h1>

      <TodoInput onAddTodo={addTodo} />
        
      <ul>
        {todos.map((todo) => (
          <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          />
        ))}
      </ul>
    
    </>
  );
}

export default App;
