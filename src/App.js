import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { addTask, editTask, deleteTask, toggleComplete } from './redux/actions';
import './App.css';

const App = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      storedTasks.forEach((task) => dispatch(addTask(task)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTaskHandler = (task) => {
    dispatch(addTask(task));
  };

  const editTaskHandler = (updatedTask) => {
    dispatch(editTask(updatedTask));
  };

  const deleteTaskHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  const toggleCompleteHandler = (id) => {
    dispatch(toggleComplete(id));
  };

  const clearTaskToEdit = () => {
    setTaskToEdit(null);
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TaskForm
        addTask={addTaskHandler}
        editTask={editTaskHandler}
        taskToEdit={taskToEdit}
        clearTaskToEdit={clearTaskToEdit}
      />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTaskHandler}
        toggleComplete={toggleCompleteHandler}
        setTaskToEdit={setTaskToEdit}
      />
    </div>
  );
};

export default App;
