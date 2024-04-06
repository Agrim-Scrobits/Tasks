import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, updateTask, addTodo, removeTodo, updateTodo, setNewTodoText, setOpenTaskId, setEditTodoId, setEditTodoText } from '../features/todo/todoSlice';

const TaskList = ({ projectId, tasks }) => {
  const dispatch = useDispatch();
  const newTodoText = useSelector(state => state.todo.newTodoText);
  const openTaskId = useSelector(state => state.todo.openTaskId);
  const editTodoId = useSelector(state => state.todo.editTodoId);
  const editTodoText = useSelector(state => state.todo.editTodoText);

  const handleRemoveTask = (projectId, taskId) => {
    dispatch(removeTask({ projectId, taskId }));
  };

  const handleUpdateTask = (taskId, newName) => {
    dispatch(updateTask({ projectId, taskId, newName }));
  };

  const handleAddTodo = (taskId) => {
    dispatch(setOpenTaskId(taskId));
  };

  const handleTodoInputChange = (e) => {
    dispatch(setNewTodoText(e.target.value));
  };

  const handleTodoInputSubmit = (taskId) => {
    if (newTodoText.trim() !== '') {
      dispatch(addTodo({ projectId, taskId, text: newTodoText }));
      dispatch(setOpenTaskId(null));
      dispatch(setNewTodoText(''));
    }
  };

  const handleRemoveTodo = (taskId, todoId) => {
    dispatch(removeTodo({ projectId, taskId, todoId }));
  };

  const handleEditTodo = (todoId, text) => {
    dispatch(setEditTodoId(todoId));
    dispatch(setEditTodoText(text));
  };

  const handleEditTodoInputChange = (e) => {
    dispatch(setEditTodoText(e.target.value));
  };

  const handleEditTodoInputSubmit = (taskId, todoId) => {
    if (editTodoText.trim() !== '') {
      dispatch(updateTodo({ projectId, taskId, todoId, newText: editTodoText }));
      dispatch(setEditTodoId(null));
      dispatch(setEditTodoText(''));
    }
  };

  return (
    <div className="mt-8 mx-4">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="bg-gray-100 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <input
                type="text"
                value={task.name}
                onChange={(e) => handleUpdateTask(task.id, e.target.value)}
                className="rounded-lg px-3 py-1 border border-gray-300 flex-grow mr-4"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleRemoveTask(projectId, task.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg"
                >
                  Remove
                </button>
                <button
                  onClick={() => handleAddTodo(task.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg"
                >
                  Add Todo
                </button>
              </div>
            </div>
            {openTaskId === task.id && (
              <div className="mt-2">
                <input
                  type="text"
                  value={newTodoText}
                  onChange={handleTodoInputChange}
                  placeholder="Enter Todo Text"
                  className="rounded-lg px-3 py-1 border border-gray-300 mr-4"
                />
                <button
                  onClick={() => handleTodoInputSubmit(task.id)}
                  className="px-3 py-1 bg-yellow-600 text-white rounded-lg"
                >
                  Submit
                </button>
              </div>
            )}
            <ul className="list-disc ml-8 mt-2">
              {task.todos.map((todo) => (
                <li key={todo.id} className="ml-4">
                  {editTodoId === todo.id ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={editTodoText}
                        onChange={handleEditTodoInputChange}
                        className="rounded-lg px-3 py-2 border border-gray-300 mr-4"
                      />
                      <button
                        onClick={() => handleEditTodoInputSubmit(task.id, todo.id)}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span>{todo.text}</span>
                      <button onClick={() => handleRemoveTodo(task.id, todo.id)} className="ml-2 text-red-600">
                        Remove
                      </button>
                      <button onClick={() => handleEditTodo(todo.id, todo.text)} className="ml-2 text-blue-600">
                        Edit
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
