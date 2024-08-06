import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Login/Signup';
import Login from './components/Login/Login';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;