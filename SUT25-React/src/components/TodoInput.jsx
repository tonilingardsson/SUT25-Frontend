import { useState } from 'react';

function TodoInput({ onAddTodo }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!onAddTodo) return;

    onAddTodo(text,category, deadline);

    // Clean up the input field afterwards
    setText('');
    setCategory('');
    setDeadline('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Skriv en todo..."
        value={text}
        onChange={(e) => setText(e.target.value)} // update with any keytouch
      />
      <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      >
        <option value={""}>Välj kategori</option>
        <option value={"arbete"}>Arbete</option>
        <option value={"privat"}>Privat</option>
        <option value={"studier"}>Studier</option>
      </select>

      {/* Date field for deadline */}
      <input type="date"
      value={deadline}
      onChange={(e) => setDeadline(e.target.value)} 
      />
      
      <button type="submit">Lägg till</button>
    </form>
  );
}

export default TodoInput;