import React, { useEffect } from 'react';
import { BrowserRouter, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { UseAuthStore } from './store/UseAuthStore';
import {Loader } from "lucide-react";
import {Toaster} from "react-hot-toast";

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = UseAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  console.log({authUser});

  if(isCheckingAuth && !authUser){
    return(
      <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin' />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
      
    </div>
  )
}

export default App
