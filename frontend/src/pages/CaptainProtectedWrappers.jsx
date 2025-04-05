import React, { useContext, useEffect }  from 'react'
import { UserContext } from '../ContextApi/userContextapi'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { CaptainContext } from '../ContextApi/CaptainContext';
import { useState } from 'react';

const CaptainProtectedWrappers = ({
    children
}) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const {captain,setCaptain}= useContext(CaptainContext);
    const [isLoading,setisLoading] = useState(true);
    useEffect(() => {
       if(!token){
        navigate('/captain-login')
       }
       axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
       }).then(response=>{
          if(response.status===200){
            setCaptain({
              name:response.data.fullname.firstname,
              email:response.data.email,
            })
            console.log(captain);
            setisLoading(false);
          }
       }).catch(error=>{
         if(error.respnose.status===401){
          localStorage.removeItem("token")
          navigate('/captain-login')
         }
       })
    },[token])
    
  if(isLoading){
    return (
      <div className='flex justify-center items-center h-screen'>
        <img className='w-25' src="https://cdn.dribbble.com/users/1162073/screenshots/3848912/media/4c8b0d5a1f7c9f8e7d4f3e6f4d7a0b0f.gif" alt="" />
      </div>
    )
  }

  return (
    <>{children}</>
  )
}

export default CaptainProtectedWrappers