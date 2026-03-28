// import React from "react";

function TodoItem({ id, text, done, category, deadline, onToggle, onDelete }) {
  const isDone = done ? 'todo-done': '';

  return (
    <div className={`todo-inner ${isDone}`}>
      <input
      type="checkbox"
      checked={done}
      onChange={() => onToggle && onToggle(id)}
      />

      <div className="todo-main">
        <span className="todo-text">{text}</span>
        <div className="todo-meta">
          {category && <span>Kategori: {category} </span>}
          {category && deadline && <span>. </span>}
          {deadline && <span>Deadline: {deadline}</span>}
        </div>
      </div>

      <button type="button" onClick={() => onDelete && onDelete(id)}>
        Ta bort
      </button>
    </div>
  );
}

export default TodoItem;