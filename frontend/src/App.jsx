import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import "./App.css";

function App() {
  return (
    <Routes>
      {/* <Route path='/' element= /> */}
      <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default App;
