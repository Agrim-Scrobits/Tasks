// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { addTask } from '../features/todo/todoSlice';

// const AddTask = () => {
//     const [input, setInput] = useState('');
//   const dispatch = useDispatch();

//   const addTaskHandler = (e) => {
//     e.preventDefault();
//     if (input.trim() === '') {
//       return;
//     }
//     dispatch(addTask(input));
//     setInput('');
//   };
//   return (
//     <form onSubmit={addTaskHandler} className="space-x-3 mt-12">
//       <input
//         type="text"
//         className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//         placeholder="Enter a Task..."
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />
//       <button
//         type="submit"
//         className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
//       >
//         Add Task
//       </button>
//     </form>
//   )
// }

// export default AddTask



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
    <form onSubmit={addTaskHandler} className="space-x-3 mt-12">
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
