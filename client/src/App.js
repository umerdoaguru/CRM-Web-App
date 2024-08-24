import React from 'react'
import Dashboard from './pages/Dashboard'

import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './components/Login';
import Registration from './components/Registration';
import Header from './components/Header';
import Register from './adiComponent/Register';
import Overview from './adiComponent/Overview';


function App() {
  const user = useSelector(state => state.auth.user);
  console.log(user);
  
  return (

    <>
    

    <Routes>
        <Route path="/" element={user? <Dashboard />:<Login/>} />
        <Route path='/login' element={<Login/>}/>
       <Route path='/admincrmdoaguru' element={<Register/>}/>
        {/* <Route path="/admincrmdoaguru" element={<Registration />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/overview' element={<Overview/>}/>
      </Routes>




    
    </>





  )
}

export default App