// import { createSlice, nanoid } from '@reduxjs/toolkit';

// export const todoSlice = createSlice({
//   name: 'tasks',
//   initialState: {
//     tasks: [],
//   },
//   reducers: {

//     addTask: (state, action) => {
//       const task = {
//         id: nanoid(),
//         name: action.payload,
//       };
//       state.tasks.push(task);
//     },
//     removeTask: (state, action) => {
//       state.tasks = state.tasks.filter(task => task.id !== action.payload);
//     },
//     updateTask: (state, action) => {
//       const { id, name } = action.payload;
//       const task = state.tasks.find(task => task.id === id);
//       if (task) {
//         task.name = name;
//       }
//     },
//   },
// });

// export const { addTask, removeTask, updateTask, addTodo, removeTodo, updateTodo } = todoSlice.actions;

// export default todoSlice.reducer;














































import { createSlice, nanoid } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: nanoid(),
        name: action.payload,
        todos: [],
      });
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, name } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.name = name;
      }
    },
    addTodo: (state, action) => {
      const { taskId, text } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.todos.push({
          id: nanoid(),
          text,
        });
      }
    },
    removeTodo: (state, action) => {
      const { taskId, todoId } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.todos = task.todos.filter(todo => todo.id !== todoId);
      }
    },
    updateTodo: (state, action) => {
      const { taskId, todoId, newText } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        const todo = task.todos.find(todo => todo.id === todoId);
        if (todo) {
          todo.text = newText;
        }
      }
    },
  },
});

export const { addTask, removeTask, updateTask, addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
