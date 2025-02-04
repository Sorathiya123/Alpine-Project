import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
// import loader from './loading-gif.gif'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
export default function Root() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3600)

  }, [location.pathname]);

  return (
    <>
      {isLoading ? (
        <div className='h-[100vh] w-full bg-[#000000] flex justify-center items-center'>
          <img src="loader.gif" alt="" className='w-[300px] ' />
        </div>
      ) : (
        <div className='overflow-x-hidden '>
          <Navbar />
          <Outlet />
          <Footer />
        </div>)

      }


    </>
  )
}
