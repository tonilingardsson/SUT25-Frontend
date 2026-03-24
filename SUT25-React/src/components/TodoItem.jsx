// import React from "react";

function TodoItem({ text, done }) {
    const className = done ? 'todo-item done' : 'todo-item';
    return <li className={className}>{text}</li>;
}


/* 
  Just nu är TodoItem "dum" – den bara visar data.
  I nästa steg kommer vi lägga till checkbox / knapp och callback-funktioner
  för att toggla "done" och ta bort todos.
*/

export default TodoItem;
