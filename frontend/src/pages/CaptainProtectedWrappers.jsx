import React, { useEffect }  from 'react'
import { UserContext } from '../ContextApi/userContextapi'
import {useNavigate} from 'react-router-dom'
const CaptainProtectedWrappers = ({
    children
}) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
       if(!token){
        navigate('/captain-login')
       }
    },[token])
  return (
    <>{children}</>
  )
}

export default CaptainProtectedWrappers