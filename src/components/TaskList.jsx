// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeTask, updateTask } from '../features/todo/todoSlice';

// const TaskList = () => {
//   const tasks = useSelector((state) => state.todo.tasks);
//   const dispatch = useDispatch();

//   const handleRemoveTask = (taskId) => {
//     dispatch(removeTask(taskId));
//   };

//   const handleUpdateTask = (taskId, newName) => {
//     dispatch(updateTask({ id: taskId, name: newName }));
//   };

//   return (
//     <div className="mt-8">
//       <h2 className="text-2xl font-bold mb-4">Tasks</h2>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id} className="text-lg mb-2">
//             <input
//               type="text"
//               value={task.name}
//               onChange={(e) => handleUpdateTask(task.id, e.target.value)}
//             />
//             <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskList;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, updateTask, addTodo } from '../features/todo/todoSlice';

const TaskList = () => {
  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState('');
  const [openTaskId, setOpenTaskId] = useState(null);

  const handleRemoveTask = (taskId) => {
    dispatch(removeTask(taskId));
  };

  const handleUpdateTask = (taskId, newName) => {
    dispatch(updateTask({ id: taskId, name: newName }));
  };

  const handleAddTodo = (taskId) => {
    setOpenTaskId(taskId);
  };

  const handleTodoInputChange = (e) => {
    setNewTodoText(e.target.value);
  };

  const handleTodoInputSubmit = (taskId) => {
    if (newTodoText.trim() !== '') {
      dispatch(addTodo({ taskId, text: newTodoText }));
      setOpenTaskId(null); // Close input box after submitting todo
      setNewTodoText('');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="text-lg mb-2">
            <input
              type="text"
              value={task.name}
              onChange={(e) => handleUpdateTask(task.id, e.target.value)}
            />
            <div className='flex justify-center'>
              <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
              <button onClick={() => handleAddTodo(task.id)}>Add Todo</button>
            </div>
            {openTaskId === task.id && (
              <div>
                <input
                  type="text"
                  value={newTodoText}
                  onChange={handleTodoInputChange}
                  placeholder="Enter Todo Text"
                />
                <button onClick={() => handleTodoInputSubmit(task.id)}>Submit</button>
              </div>
            )}
            <ul>
              {task.todos.map((todo) => (
                <li key={todo.id}>{todo.text}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
