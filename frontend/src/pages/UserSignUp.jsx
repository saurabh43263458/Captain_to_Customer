import React from 'react'
import { Link } from 'react-router-dom'
import Input from "../Components/input"

import { useState } from 'react'
const UserSignUp = () => {
  const [formData,setformData]=useState({
      firstname:"",
      lastname:"",
    email:"",
    password:"",
  })
  const handlechange =(field,value)=>{
   setformData({...formData ,[field]:value});
  };
  
  const handlesubmit =(e)=>{
    e.preventDefault();
    console.log(formData);
    setformData({
        firstname:" ",
        lastname:" ",
     
      email:" ",
      password:" ",
    })
  }
  return (
    <div className='h-screen flex flex-col '>
     
     <img className="w-25 ml-8 mt-2" src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />

      <div className=' h-screen flex flex-col justify-between py-8 mx-9'>
        <form onSubmit={handlesubmit} action="" className=''>
          <h2 className="text-2xl font-bold">Where's your name</h2>
          <Input config={{type:"text",placeholder:"First name" ,width:"w-[48%]"}} value={formData.firstname} onChange={(e)=>{
         handlechange("firstname",e.target.value)
          }}/>
          <Input config={{type:"text",placeholder:"last name" ,width:"w-[48%] " ,margin:"ml-2"}} value={formData.lastname} onChange={(e)=>{
            handlechange("lastname",e.target.value);
          }}/>
          <h2 className="text-2xl font-bold">What's your email</h2>
          <Input config={{type:"email" , placeholder:"email123@gmail.com" }} value={formData.email} onChange={(e)=>{
            handlechange("email",e.target.value)
          }}/>
          <h2 className="text-2xl font-bold">Enter Password</h2>
          <Input config={{type:"password" , placeholder:"Enter your password"}} value={formData.password} onChange={(e)=>{
            handlechange("password",e.target.value);
          }}/>
        <button type="submit" className='bg-black w-full rounded-2xl py-4 text-white font-bold text-2xl my-3' >Login</button>
        <p className="text-xl mt-2 font-bold text-center">Already have a account <Link className='text-blue-600'>Login Here</Link></p>
        </form>
       <Link to="/captain-signup" className='w-full bg-green-500 flex justify-center items-center py-5 rounded-2xl text-2xl font-bold'>Sign up as Captain</Link>
   
    </div>
    </div>
  )
}

export default UserSignUp