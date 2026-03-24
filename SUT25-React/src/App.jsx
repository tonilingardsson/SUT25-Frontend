import { useState } from 'react';           // 1) Importera useState från React [web:47]
import './App.css'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Lära mig React', done: false },
    { id: 2, text: 'Bygga en todo-app', done: true },
    { id: 3, text: 'Spara todos i localStorage', done: false },

  ]);

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

  return (
    <>
      <h1>My new React App for Petter</h1>
      <TodoInput />
      {/* 4) Gå igenom todos-arrayen med map och skapa ett TodoItem per todo [web:45] */}
        
      <ul>      {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            done={todo.done}
          />
        ))}
      </ul>
    
    </>
  );
}

export default App;
