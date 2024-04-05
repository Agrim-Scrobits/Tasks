import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/todo/todoSlice';
import TaskList from './TaskList';

const AddTask = ({ projectId, tasks }) => {
    const dispatch = useDispatch();

    const addTaskHandler = (e) => {
        e.preventDefault();
        const taskName = e.target.taskName.value.trim();
        if (taskName === '') {
            return;
        }
        dispatch(addTask({ projectId, taskName }));
        e.target.taskName.value = '';
    };

    return (
        <div className="mt-4">
            <form onSubmit={addTaskHandler} className="space-x-3">
                <input
                    type="text"
                    name="taskName"
                    className="bg-gray-200 rounded border text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Enter a Task..."
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-1 px-4 rounded"
                >
                    Add Task
                </button>
            </form>
            <TaskList projectId={projectId} tasks={tasks} />
        </div>
    );
};

export default AddTask;
