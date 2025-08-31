import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from "axios"

const API_URL = "https://signin-backend-e8j7.onrender.com";

const Login = () => {
     
    const navi=useNavigate()
    const[login,setlogin]=useState("")
    const[email,setemail]=useState("")
    const[pass,setpass]=useState("")
     const [message, setMessage] = useState("Log in to your galaxy account") // default msg

  // ✅ Clear inputs every time this page mounts
  useEffect(() => {
    setemail("")
    setpass("")
     setMessage("Log in to your galaxy account")
  }, [])

    const handleuser=(e)=>{
        setemail(e.target.value)
    }

    
    const handlepass=(e)=>{
        setpass(e.target.value)
    }


    const handlesign=()=>{
       navi("/signin")
    }

    //   const handlelogin=()=>{
    //    navi("/Dashboard")
    // }
   
   const handleLogin = () => {
   var login= axios.post(`${API_URL}/`, {
      email: email,
      password: pass
    })
    login.then(function(data){
        console.log(data)
        if(data.data===true){
            navi("/Dashboard")
        }
        else{
          setMessage("Don't have an account? Register now!")
        } 
    
    })
     .catch(err => {
        console.error(err)
        setMessage("Error logging in. Please try again.")
      })

    // clear immediately after attempt
    setemail("")
    setpass("")
  
  }


  return (

    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-purple-900 relative overflow-hidden">
      
      {/* Stars background (optional twinkling dots effect) */}
      <div className="absolute inset-0 bg-[radial-gradient(white,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
      
      {/* Card */}
      <div className="w-full max-w-sm bg-black/60 backdrop-blur-md shadow-xl rounded-2xl p-6 flex flex-col gap-5 border border-purple-500/40 relative z-10">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-purple-300 tracking-wide">
          🚀 Welcome Back
        </h2>
        <p className="text-sm text-center text-purple-200/70">
         {message}
        </p>

        {/* Username */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-purple-200">Email</label>
          <input
            value={email}
            onChange={handleuser}
            type="text"
            placeholder="Enter Email"
            className="border border-purple-500/50 rounded-lg px-3 py-2 bg-black/40 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-purple-200">Password</label>
          <input
           value={pass}
           onChange={handlepass}
            type="password"
            placeholder="Enter password"
            className="border border-purple-500/50 rounded-lg px-3 py-2 bg-black/40 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button onClick={handleLogin}  className="w-1/2 bg-purple-600 text-white font-semibold rounded-lg py-2 hover:bg-purple-700 hover:shadow-[0_0_15px_rgba(168,85,247,0.8)] transition">
            Login
          </button>
          <button onClick={handlesign} className="w-1/2 border border-purple-400 text-purple-300 font-semibold rounded-lg py-2 hover:bg-purple-900/40 transition">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login

