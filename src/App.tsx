import React from 'react'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import Login from './auth/Login'
import Register from './auth/Register'
import IsLoggedInProvider from './context/isLoggedInProvider'

import { createBrowserRouter, RouterProvider, Routes, Route, BrowserRouter } from 'react-router-dom'


const App = () => {

  const router = createBrowserRouter([
    {
      path:'/',
      element: 
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path: '/about',
      element: 
      <div>
        <Navbar />
        <About />
      </div>
    },
    {
      path: '/contact',
      element: 
      <div>
        <Navbar />
        <Contact />
      </div>
    },
    {
      path: '/login',
      element: <div>
        <Login />
      </div>
    },
    {
      path: '/register',
      element: <div>
        <Register />
      </div>
    }
    
  ])
  return (
    <>
      <IsLoggedInProvider>
        <RouterProvider router={router} /> 
      </IsLoggedInProvider>
    </>
  )
}

export default App