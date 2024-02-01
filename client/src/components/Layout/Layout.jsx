import React from 'react'
import Header from '../Header/Header'
// import Footer from '../Footer/Footer'
import Router from '../Router/Router'


const Layout = () => {
  return (
    <>
        <Header/>
        <main>
            <Router/>
        </main>
    </>
  )
}

export default Layout