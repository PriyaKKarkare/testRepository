import './App.css'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/SideBar/Sidebar'
import Header from './components/Header/Header'
import DashBoard from './pages/DashBoard'

function App() {
  return (
    <Routes>
      <Route path='/' element={<DashBoard />} />
    </Routes>
  )
}

export default App
