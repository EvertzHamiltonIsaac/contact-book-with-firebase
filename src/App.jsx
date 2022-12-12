import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <section className="App">
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
    </section>
  )
}

export default App
