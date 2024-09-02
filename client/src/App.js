import React from 'react'
import Dashboard from '../src/adiComponent/Dashboard'

import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './components/Login';
import Registration from './components/Registration';
import Header from './components/Header';
import Register from './adiComponent/Register';
import Overview from './adiComponent/Overview';
import Leads from './adiComponent/Leads';
import EditProfile from './adiComponent/editProfle';
import UserProfile from './adiComponent/userProfile';
import Sider from './components/Sider';
import EmployeeManagement from './adiComponent/EmployManagement';
import EmployeeSingle from './adiComponent/EmployeSingle';


function App() {
  const user = useSelector(state => state.auth.user);
  console.log(user);
  
  return (

    <>
    
<Header/>

    <Routes>
        <Route path="/" element={user? <Dashboard />:<Login/>} />
        <Route path='/login' element={<Login/>}/>
       <Route path='/admincrmdoaguru' element={<Register/>}/>
        {/* <Route path='/edit-profile' element={<EditProfile/>}/> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/overview' element={<Overview/>}/>
        <Route path='/leads' element={<Leads/>}/>
        <Route path='/edit-profile' element={<UserProfile/>}/>
        <Route path='/employee-management' element={<EmployeeManagement/>}/>
        <Route path='/employee-single/:employeeId' element={<EmployeeSingle/>}/>
      </Routes>
    
    </>
  )
}

export default App