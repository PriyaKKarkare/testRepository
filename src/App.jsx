import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/SideBar/Sidebar'
import DashBoard from './pages/DashBoard'
import Home from './pages/Home'
import Navbar from './components/NavBar/Navbar'

function App() {
  return (
    <div className='flex h-screen w-screen overflow-hidden bg-[#F6F5FD]'>
      <Sidebar />
      <div className='flex flex-1 flex-col overflow-hidden'>
        <Navbar />
        <main className='flex-1 overflow-auto'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/rms/disbursement' element={<DashBoard />} />
            <Route path='*' element={<Navigate to="/" replace />} />

          </Routes>
        </main>
      </div>
    </div>


  )
}

export default App
