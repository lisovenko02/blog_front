import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import { Toaster } from 'react-hot-toast'

const Layout = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
        <Toaster position="top-right" reverseOrder={false} />
      </main>
    </>
  )
}

export default Layout
