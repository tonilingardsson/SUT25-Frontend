import { useState, useEffect } from 'react';           // 1) Importera useState från React [web:47]
import './App.css'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState(() => {

    const stored = localStorage.getItem('todos');

    if (!stored) {
      // Default return: if there is nothing spared, return this list
      return [
        { id:1, text: "Lära mig React", done:true, category: "studier", deadline: "2026-04-01" },
        { id:2, text: "Bygga en todo-app", done:false , category: "arbete", deadline: "2026-03-28"},
        { id:3, text: "Spara todos i localStorage", done:true , category: "studier", deadline: "2026-03-30"},
      ];
    }

    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  );

    // Which category to be shown
  const [selectedCategory, setSelectedCategory] = useState("");

   // Which sorting to be used
   const [sortBy, setSortBy] = useState("none");

  function addTodo(text, category, deadline){
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo = {
      id: Date.now(),
      text: trimmed,
      done: false,
      category: category || "", // Can be an empty string
      deadline: deadline || "", // Can be empty as well

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

  // Filter after category
  const filteredTodos = todos.filter((todo) => {
    if(!selectedCategory) return true; // no filter? Show all
    return todo.category === selectedCategory;
  });

  // Sort the filtered 
  const sortedTodos = [...filteredTodos].sort((a,b) => {
    if (sortBy === "deadline") {
      // Empty deadlines are listed last
      if (!a.deadline && !b.deadline) return 0;
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;

      // Compare the dates (YYYY-MM-DD works direct)
      if (a.deadline < b.deadline) return -1;
      if (a.deadline > b.deadline) return 1;
      return 0;
    }

    if (sortBy === "status") {
      // Not done first, done last
      if (a.done === b.done) return 0;
      return a.done ? 1 : -1;
    }

    // None? No sorting
    return 0;

  });
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // dependency-array: only when todos changes

  return (
    <>

      <h1>Petter to-review list</h1>

      {/* Filter by category */}
      <div><label htmlFor="">Filtrera kategori:&nbsp;
        <select value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)} ><option value="">Alla</option>
        <option value="arbete">Arbete</option>
        <option value="privat">Privat</option>
        <option value="studier">Studier</option>
        </select>
        </label>
        
        {/* Sorting */}
        <label style={{marginLeft: "1rem" }}>
          Sortera:&nbsp;
          <select value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}>
            <option value="none">Ingen</option>
            <option value="deadline">Deadline</option>
            <option value="status">Status (klar/ej klar)</option>
          </select>
        </label>
        </div>

      <TodoInput onAddTodo={addTodo} />
      
      <ul>
        {sortedTodos.map((todo) => (
          <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
          category={todo.category}
          deadline={todo.deadline}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          />
        ))}
      </ul>
    </>
  );
}

export default App;