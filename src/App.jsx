import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Owner from './pages/Owner';
import Help from './pages/Help';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DriverDashboard from './dashboard/DriverDashboard';

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Owner" element={<Owner />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/dashboard/driver" element={<DriverDashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}
