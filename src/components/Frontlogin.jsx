import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'

const Frontlogin = () => {
  return (
   <>
   <BrowserRouter>
   <Routes>

  <Route path="/" element={<Login/>}/>
   <Route path="/signin" element={<Register/>}/>
    <Route path="/Dashboard" element={<Dashboard/>}/>
   </Routes>
   
   </BrowserRouter>
   </>
  )
}

export default Frontlogin