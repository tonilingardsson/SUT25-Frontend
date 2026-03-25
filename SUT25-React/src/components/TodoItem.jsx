// import React from "react";

function TodoItem({ id, text, done, category, deadline, onToggle, onDelete }) {
    const className = done ? 'todo-item done' : 'todo-item';

    function handleToggle(){
        if (onToggle) {
            onToggle(id);
        }
    }

    function handleDelete() {
        if (onDelete) {
            onDelete(id);
        }
    }

    return (
        <li className={className}>
            {/* Checkbox to mark done/not-done */}
            <input 
            type="checkbox"
            checked={done}
            onChange={handleToggle}
            />
            <div className="flex" style={{flex:1}}>
                <span>{text}</span>
                <div className="small-font" style={{fontSize:'0.8rem', color:'#666'}}>
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
