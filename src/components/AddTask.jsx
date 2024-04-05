import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/todo/todoSlice';

const AddTask = () => {
  const dispatch = useDispatch();

  const addTaskHandler = (e) => {
    e.preventDefault();
    const taskName = e.target.taskName.value.trim();
    if (taskName === '') {
      return;
    }
    dispatch(addTask(taskName));
    e.target.taskName.value = '';
  };

  return (
    <form onSubmit={addTaskHandler} className="space-x-3 mt-12 mx-4">
      <input
        type="text"
        name="taskName"
        className="bg-gray-800 rounded border text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Task..."
      />
      <button
        type="submit"
        className="text-black border-black border-2 py-1 px-6 rounded text-lg"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
