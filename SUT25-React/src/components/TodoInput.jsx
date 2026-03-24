import { useState } from 'react';

function TodoInput({ onAddTodo }) {
  const [value, setValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (onAddTodo) {
      onAddTodo(value);
    }

    // Clean up the input field afterwards
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Skriv en todo..."
        value={value}
        onChange={(e) => setValue(e.target.value)} // update with any keytouch
      />
      <button type="submit">Lägg till</button>
    </form>
  );
}

export default TodoInput;