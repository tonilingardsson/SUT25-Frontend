// import React from "react";

function TodoItem({ id, text, done, category, deadline, index, onToggle, onDelete, onMove }) {
  const className = done ? "todo-item done" : "todo-item";

  function handleToggle() {
    if (onToggle) {
      onToggle(id);
    }
  }

  function handleDelete() {
    if (onDelete) {
      onDelete(id);
    }
  }

  function handleDragStart(e) {
    // Save the start index in dataTransfer
    e.dataTransfer.setData("text/plain", String(index));
  }

  function handleDragOver(e) {
    // Must have a preventDefault for the drop to work
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const fromIndexStr = e.dataTransfer.getData("text/plain");
    const fromIndex = Number(fromIndexStr);
    const toIndex = index;

    if (onMove && !Number.isNaN(fromIndex)) {
        onMove(fromIndex, toIndex);
    }
  }

  return (
    <li 
    className={className}
    draggable
    onDragStart={handleDragStart}
    onDragOver={handleDragOver}
    onDrop={handleDrop}
    >
      <input 
      type="checkbox"
      checked={done}
      onChange={handleToggle}
      />
      <div className="flex" style={{ flex: 1 }}>
        <span>{text}</span>
        <div
          className="small-font"
          style={{ fontSize: "0.8rem", color: "#666" }}
        >
          {/** Fallback if the category or deadline is missing */}
          {category && <span>Kategori: {category} </span>}
          {category && <span>| Deadline: {deadline} </span>}
        </div>
      </div>

      {text}
      <button type="button" onClick={handleDelete}>
        Ta bort
      </button>
    </li>
  );
}

export default TodoItem;
