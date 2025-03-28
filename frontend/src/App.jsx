import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import "./App.css";
import Register from './pages/Login/Register';
import Index from './pages/Index'
import PrivateRoute from './components/login/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      
      <Route element={<PrivateRoute />}>
        <Route path='/a' element={<Index />} />
      </Route>
    </Routes>
  )
}

export default App;
