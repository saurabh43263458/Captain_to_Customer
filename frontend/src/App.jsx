import React from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from "./pages/Home"
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp"
import CaptainLogin from "./pages/CaptainLogin"
import CaptainSignUp from './pages/CaptainSignUP'
import Start from './pages/start';
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import UserLogout from './pages/UserLogout';
import CaptainProtectedWrappers from './pages/CaptainProtectedWrappers';
import CaptainLogout from './pages/CaptainLogout';
import CaptianHome from './pages/CaptianHome';
const App = () => {
  return (
  <div >
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignUp/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignUp/>}/>
        <Route path='/start-home' element={
          <UserProtectedWrapper>
            <Start/>
          </UserProtectedWrapper>
        }/>
        <Route path='/logout' element={<UserProtectedWrapper>
          <UserLogout/>
          </UserProtectedWrapper>}/>
          <Route path='/captain-home' element={<CaptainProtectedWrappers>
            <CaptianHome/>
          </CaptainProtectedWrappers>}/>
          <Route path='/captain-logout' element={<CaptainProtectedWrappers>
            <CaptainLogout/></CaptainProtectedWrappers>}/>
      </Routes>

  </div>
    
  )
}

export default App