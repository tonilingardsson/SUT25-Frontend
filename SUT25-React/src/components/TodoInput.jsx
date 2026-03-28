import { useState } from 'react';

function TodoInput({ onAddTodo }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  function handleSubmit(event) {
    event.preventDefault();

    if (!onAddTodo) return;

    if (deadline && deadline < todayStr) {
      alert("Deadline kan inte vara bakåt i tiden.");
      return;
    }

    onAddTodo(text,category, deadline);

    // Clean up the input field afterwards
    setText('');
    setCategory('');
    setDeadline('');
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
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
      min={todayStr}
      onChange={(e) => setDeadline(e.target.value)} 
      />

      <button type="submit">Lägg till</button>
    </form>
  );
}

export default TodoInput;