import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <Router>
            <Routes>
              <Route path='/' element={<Login/>}> </Route>
            </Routes>
          </Router>
      </div>
     
    </>
  )
}

export default App
