import React, { useState } from 'react'
import {Link} from "react-router-dom"
const CaptainLogin = () => {
   const [Email,setEmail]= useState('');
    const [Password,setPassword]= useState('');
    const [CaptainData,setCaptainData]=useState({});
  
    const submitCaptainData =(e)=>{
      e.preventDefault();
      setCaptainData({
        email:Email,
        password:Password
      })
      console.log(CaptainData)
      setEmail(' ');
      setPassword(' ');
    }
  return (
    <div className="h-screen flex flex-col ">
      <img className="w-25 ml-8 mt-2" src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png" alt="" />
     
      <div className='my-8 h-screen mx-8 flex flex-col justify-between '>
      <form className=" flex flex-col justify-between" onSubmit={(e)=>{
        submitCaptainData(e);
      }}>
         <h2 className='text-3xl font-bold '>What's your email</h2>
         <input className="w-full bg-gray-300 placeholder:text-2xl px-2 py-5 my-4" type="email" required placeholder='email123@gmail.com' 
         value={Email} 
         onChange={(e)=>{
          setEmail(e.target.value)
         }} />
         <h2  className='text-3xl font-bold' >Enter Password</h2>
         <input value={Password} onChange={(e)=>{
          setPassword(e.target.value)
         }} className="w-full bg-gray-300 placeholder:text-2xl px-2 py-5 my-4" type="password" required placeholder='password' />
         <button className="flex justify-center items-center w-full mb-1 bg-black text-white  text-2xl font-bold py-5 my-5 rounded-2xl">Login</button>
         <p className=" mt-2 text-center text-2xl font-bold">Become a captainn? <Link to="/captain-signup" className="text-blue-700"> Create new Account</Link></p>
      </form>
      <Link to="/login" className='flex justify-center items-center bg-amber-600 text-white py-5 text-2xl font-bold rounded-xl'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin