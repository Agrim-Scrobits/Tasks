import logo from './logo.svg';
import './App.css';
import AddTask from './components/AddTask';
// import Tasks from './components/Tasks';
// import Todos from './components/Tasks';
import TaskList from './components/TaskList';

function App() {
  return (
    <>
      <AddTask />
      {/* <Todos /> */}
      <TaskList />
    </>
  );
}

export default App;
