import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import ProtectedRoutes from './components/ProtectedRoutes'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [isLogged, setIsLogged] = useState(false);
  

  return (
    <section className="App">
      <AuthProvider>
        <Routes>
          <Route path="/SignIn" element={<Login setIsLogged={setIsLogged} />} />
          <Route path="/SignUp" element={<Register />} />

          <Route element={<ProtectedRoutes isLogged={isLogged} />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </section>
  )
}

export default App
