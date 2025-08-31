import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {
  const navi=useNavigate()
   
  const[name,setname]=useState("")
  const[email,setemail]=useState("")
  const[passcode,setpasscode]=useState("")
   const [message, setMessage] = useState("Create your galaxy account 🌌")

  useEffect(() => {
    setname("")
    setemail("")
    setpasscode("")
  }, [])

  const handlename=(e)=>{
    setname(e.target.value)
  }
   const handleemail=(e)=>{
    setemail(e.target.value)
  }
   const handlepasscode=(e)=>{
    setpasscode(e.target.value)
   }


   const handlesignin = () => {
   var login= axios.post("http://localhost:3000/signup", {
   username: name,  
    email: email,
    password: passcode 
    })
    login.then(function(data){
        console.log(data)
     setMessage("✅ Registered successfully! Please login.")
     
      // reset inputs
  setname("")
  setemail("")
  setpasscode("")

      // redirect to login
      navi("/")
    })
     .catch(err => {
      console.error(err)
      setMessage("⚠️ Registration failed. Try again.")
    })

  
  }

     const handlebacktologin=()=>{
       navi("/")
    }
   
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-purple-900 relative overflow-hidden">
      
      {/* Stars background */}
      <div className="absolute inset-0 bg-[radial-gradient(white,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
      
      {/* Card */}
      <div className="w-full max-w-md bg-black/60 backdrop-blur-md shadow-xl rounded-2xl p-6 flex flex-col gap-5 border border-purple-500/40 relative z-10">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-purple-300 tracking-wide">
          🌌 Create Account
        </h2>
        <p className='text-purple-300'>{message}</p>
       

        {/* Username */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-purple-200">Name</label>
          <input
           onChange={handlename}
           value={name}
            type="text"
            placeholder="Enter your Name"
            className="border border-purple-500/50 rounded-lg px-3 py-2 bg-black/40 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-purple-200">Email</label>
          <input
          onChange={handleemail}
          value={email}
            type="email"
            placeholder="Enter your email"
            className="border border-purple-500/50 rounded-lg px-3 py-2 bg-black/40 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Password */}

        <div className="flex flex-col gap-1">
          <label className="text-sm text-purple-200">Password</label>
          <input
          onChange={handlepasscode}
          value={passcode}
            type="password"
            placeholder="Create a password"
            className="border border-purple-500/50 rounded-lg px-3 py-2 bg-black/40 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

      

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <button onClick={handlesignin} className="w-full bg-purple-600 text-white font-semibold rounded-lg py-2 hover:bg-purple-700 hover:shadow-[0_0_15px_rgba(168,85,247,0.8)] transition">
            Sign Up
          </button>
          <button onClick={handlebacktologin} className="w-full border border-purple-400 text-purple-300 font-semibold rounded-lg py-2 hover:bg-purple-900/40 transition">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
