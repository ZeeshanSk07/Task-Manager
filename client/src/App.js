import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import TaskList from './pages/TaskList';
import TaskDetails from './pages/TaskDetails';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';

function App() {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false}/>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/dashboard' element={<TaskList/>}/>
          <Route exact path='/dashboard/:id' element={<TaskDetails/>}/>
          <Route exact path='/dashboard/create' element={<CreateTask/>}/>
          <Route exact path='/dashboard/edit/:id' element={<EditTask/>}/>
          {/* <Route exact path='*' element={<NotFound/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;