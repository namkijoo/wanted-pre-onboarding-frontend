
import { BrowserRouter,Router,Routes,Route,Link,useParams } from 'react-router-dom';

import './App.css';
import Login from './auth/login';
import Register from './auth/register';
import Todo from './todo/todo';
function App() {
  return (
    <Routes>
      <Route path='signin' element={<Login/>}></Route>
      <Route path='signup' element={<Register/>}></Route>
      <Route path='todo' element={<Todo/>}></Route>
    </Routes>
  );
}

export default App;
