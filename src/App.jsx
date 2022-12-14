import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import ProtectedRoutes from './components/ProtectedRoutes'
import { AuthProvider, useAuth } from './context/AuthContext'

function App() {  
  return (
    <section className="App">
      <AuthProvider>
        <Routes>
          <Route path="/SignUp" element={<Register />} />
          <Route path="/SignIn" element={<Login />} />   

          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </section>
  )
}

export default App
