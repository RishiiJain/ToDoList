import React, { useState, useEffect } from 'react';
import './TodoList.css'; 

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('');
  const [sortCompleted, setSortCompleted] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleToggleComplete = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const filteredTasks = tasks
    .filter(task => task.text.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => sortCompleted ? a.completed - b.completed : 0);

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <div>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter tasks"
        />
        <label>
          <input
            type="checkbox"
            checked={sortCompleted}
            onChange={(e) => setSortCompleted(e.target.checked)}
          />
          Sort by completion
        </label>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(index)}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                marginLeft: '10px',
                flexGrow: 1,
              }}
            >
              {task.text}
            </span>
            <button onClick={() => handleRemoveTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
