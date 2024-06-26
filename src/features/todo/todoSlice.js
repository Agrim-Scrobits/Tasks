import { createSlice, nanoid } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    newProjectName: '',
    updatedProjectName: '',
    isUpdating: false,
    projectIdToUpdate: null,
    newTodoText: '',
    openTaskId: null,
    editTodoId: null,
    editTodoText: '',
  },
  reducers: {
    addProject: (state, action) => {
      state.projects.push({
        id: nanoid(),
        name: action.payload,
        tasks: [],
      });
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
    updateProject: (state, action) => {
      const { id, name } = action.payload;
      const project = state.projects.find(project => project.id === id);
      if (project) {
        project.name = name;
      }
    },
    addTask: (state, action) => {
      const { projectId, taskName } = action.payload;
      const project = state.projects.find(project => project.id === projectId);
      if (project) {
        project.tasks.push({
          id: nanoid(),
          name: taskName,
          todos: [],
        });
      }
    },
    removeTask: (state, action) => {
      const { projectId, taskId } = action.payload;
      const project = state.projects.find(project => project.id === projectId);
      if (project) {
        project.tasks = project.tasks.filter(task => task.id !== taskId);
      }
    },
    updateTask: (state, action) => {
      const { projectId, taskId, newName } = action.payload;
      const project = state.projects.find(project => project.id === projectId);
      if (project) {
        const task = project.tasks.find(task => task.id === taskId);
        if (task) {
          task.name = newName;
        }
      }
    },
    addTodo: (state, action) => {
      const { projectId, taskId, text } = action.payload;
      const projectIndex = state.projects.findIndex(project => project.id === projectId);
      if (projectIndex !== -1) {
        const taskIndex = state.projects[projectIndex].tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          state.projects[projectIndex].tasks[taskIndex].todos.push({
            id: nanoid(),
            text,
          });
        }
      }
    },


    removeTodo: (state, action) => {
      const { projectId, taskId, todoId } = action.payload;
      const project = state.projects.find(project => project.id === projectId);
      if (project) {
        const task = project.tasks.find(task => task.id === taskId);
        if (task) {
          task.todos = task.todos.filter(todo => todo.id !== todoId);
        }
      }
    },
    updateTodo: (state, action) => {
      const { projectId, taskId, todoId, newText } = action.payload;
      const project = state.projects.find(project => project.id === projectId);
      if (project) {
        const task = project.tasks.find(task => task.id === taskId);
        if (task) {
          const todo = task.todos.find(todo => todo.id === todoId);
          if (todo) {
            todo.text = newText;
          }
        }
      }
    },

    setNewProjectName: (state, action) => {
      state.newProjectName = action.payload;
    },
    setUpdatedProjectName: (state, action) => {
      state.updatedProjectName = action.payload;
    },
    setIsUpdating: (state, action) => {
      state.isUpdating = action.payload;
    },
    setProjectIdToUpdate: (state, action) => {
      state.projectIdToUpdate = action.payload;
    },
    setNewTodoText: (state, action) => {
      state.newTodoText = action.payload;
    },
    setOpenTaskId: (state, action) => {
      state.openTaskId = action.payload;
    },
    setEditTodoId: (state, action) => {
      state.editTodoId = action.payload;
    },
    setEditTodoText: (state, action) => {
      state.editTodoText = action.payload;
    },

  },
});

export const { addProject, removeProject, updateProject, addTask, removeTask, updateTask, addTodo, removeTodo, updateTodo, setNewProjectName, setUpdatedProjectName, setIsUpdating, setProjectIdToUpdate, setNewTodoText, setOpenTaskId, setEditTodoId, setEditTodoText } = todoSlice.actions;

export default todoSlice.reducer;
