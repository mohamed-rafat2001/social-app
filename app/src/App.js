// import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './components/register/Register'
import Home from './components/Pages/Home/Home';



function App() {

  return (

    <div className="App">
      <Routes>
        <Route path='/Home/*' element={<Home />} />
        <Route path='/' element={<Register />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>

    </div>


  );
}

export default App;
