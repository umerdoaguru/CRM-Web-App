import React from 'react'
import Dashboard from './pages/Dashboard'

import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './components/Login';
import Registration from './components/Registration';
import Header from './components/Header';


function App() {
  const user = useSelector(state => state.auth.user);
  console.log(user);
  
  return (

    <>
    

    <Routes>
        <Route path="/" element={user? <Dashboard />:<Login/>} />
      
       
        <Route path="/admincrmdoaguru" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>




    
    </>





  )
}

export default App