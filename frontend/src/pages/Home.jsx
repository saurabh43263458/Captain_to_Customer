import React from 'react'
import {Link} from "react-router-dom"
const Home = () => {
  return (
    <div>
        <div className=" h-screen bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1566243052021-d39ace07c392?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] flex justify-between flex-col">
          <img className="w-25 ml-8"  src="https://cdn.freebiesupply.com/logos/large/2x/uber-15-logo-png-transparent.png" alt="traffic" />
            <div className='  bg-white flex flex-col items-center justify-around '> 
              <div className='w-[80%] '>
              <h2 className='text-2xl font-bold my-6'>Get Started with Uber</h2>
              <Link to="/login" className='flex justify-center items-center w-full mb-5 bg-black text-white rounded-2xl text-2xl font-bold py-8'>Continue</Link>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Home