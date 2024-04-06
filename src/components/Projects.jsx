import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, removeProject, updateProject, setNewProjectName, setUpdatedProjectName, setIsUpdating, setProjectIdToUpdate } from '../features/todo/todoSlice';
import AddTask from './AddTask';

const Projects = () => {
    const projects = useSelector(state => state.todo.projects);
    const newProjectName = useSelector(state => state.todo.newProjectName);
    const updatedProjectName = useSelector(state => state.todo.updatedProjectName);
    const isUpdating = useSelector(state => state.todo.isUpdating);
    const projectIdToUpdate = useSelector(state => state.todo.projectIdToUpdate);
    const dispatch = useDispatch();

    const handleAddProject = () => {
        if (newProjectName.trim() !== '') {
            dispatch(addProject(newProjectName));
            dispatch(setNewProjectName(''));
        }
    };

    const handleRemoveProject = (projectId) => {
        dispatch(removeProject(projectId));
    };

    const handleUpdateProject = () => {
        if (updatedProjectName.trim() !== '') {
            dispatch(updateProject({ id: projectIdToUpdate, name: updatedProjectName }));
            dispatch(setUpdatedProjectName(''));
            dispatch(setIsUpdating(false));
            dispatch(setProjectIdToUpdate(null));
        }
    };

    return (
        <div className="mt-8 mx-4">
            <h1 className="text-2xl font-bold mb-4">Projects</h1>
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Add Project</h2>
                <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => dispatch(setNewProjectName(e.target.value))}
                    placeholder="Enter Project Name..."
                    className="bg-gray-800 rounded border text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <button
                    onClick={handleAddProject}
                    className="text-black border-black border-2 py-1 px-6 rounded text-lg"
                >
                    Add Project
                </button>
            </div>
            <div>
                <h2 className="text-lg font-semibold">Projects List</h2>
                <ul className="space-y-4">
                    {projects.map(project => (
                        <li key={project.id} className="bg-gray-100 rounded-lg p-4">
                            {isUpdating && project.id === projectIdToUpdate ? (
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="text"
                                        value={updatedProjectName}
                                        onChange={(e) => dispatch(setUpdatedProjectName(e.target.value))}
                                        className="bg-gray-800 rounded border text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                    <button
                                        onClick={handleUpdateProject}
                                        className="text-black border-black border-2 py-1 px-6 rounded text-lg"
                                    >
                                        Update
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <span>{project.name}</span>
                                    <button
                                        onClick={() => handleRemoveProject(project.id)}
                                        className="text-red-600 ml-2"
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => {
                                            dispatch(setIsUpdating(true));
                                            dispatch(setUpdatedProjectName(project.name));
                                            dispatch(setProjectIdToUpdate(project.id));
                                        }}
                                        className="text-blue-600 ml-2"
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
                            <AddTask projectId={project.id} tasks={project.tasks} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Projects;
