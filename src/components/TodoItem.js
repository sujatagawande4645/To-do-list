import React from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  const priorityColor = {
    High: 'red',
    Medium: 'yellow',
    Low: 'green',
  };

  return (
    <li
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      style={{ borderLeft: `5px solid ${priorityColor[todo.priority]}` }}
      onClick={() => toggleComplete(todo.id)}
    >
      <span>{todo.text}</span>
      <span className="todo-date">{todo.date}</span>
      <button onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }} >Delete</button>
    </li>
  );
};

export default TodoItem;
