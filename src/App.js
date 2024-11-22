import React, { useState } from "react";
import TodoItem from "./components/TodoItem";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoCategory, setNewTodoCategory] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState("");
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isCompletedFilter, setIsCompletedFilter] = useState(false);
  const [isPendingFilter, setIsPendingFilter] = useState(false);

  const addTodo = () => {
    if (newTodoText.trim() && newTodoPriority) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodoText,
          date: selectedDate || new Date().toLocaleDateString(),
          completed: false,
          category: newTodoCategory,
          priority: newTodoPriority,
        },
      ]);
      setNewTodoText("");
      setNewTodoCategory("");
      setNewTodoPriority("");
      setSelectedDate("");
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter !== "All" && todo.category !== filter) return false;

    const lowerQuery = searchQuery.toLowerCase();
    if (
      !todo.text.toLowerCase().includes(lowerQuery) &&
      !todo.category.toLowerCase().includes(lowerQuery) &&
      !todo.priority.toLowerCase().includes(lowerQuery)
    )
      return false;

    if (isCompletedFilter && !todo.completed) return false;
    if (isPendingFilter && todo.completed) return false;

    return true;
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="app">
      <h1>To-Do List</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="add-todo-form">
        <input
          type="text"
          placeholder="Add new task..."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <select
          value={newTodoCategory}
          onChange={(e) => setNewTodoCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="College">College</option>
        </select>
        <select
          value={newTodoPriority}
          onChange={(e) => setNewTodoPriority(e.target.value)}
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <button onClick={addTodo}>Add</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Work")}>Work</button>
        <button onClick={() => setFilter("Personal")}>Personal</button>
        <button onClick={() => setFilter("College")}>College</button>
      </div>

      <div className="checkbox-filters">
        <div>
          <input
            type="checkbox"
            checked={isCompletedFilter}
            onChange={() => setIsCompletedFilter(!isCompletedFilter)}
          />
          <label>Completed</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={isPendingFilter}
            onChange={() => setIsPendingFilter(!isPendingFilter)}
          />
          <label>Pending</label>
        </div>
      </div>

      <ul className="todo-list">
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
