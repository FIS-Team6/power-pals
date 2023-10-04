'use client' 
import React from 'react'
import Image from 'next/image'
import rocket from '../../assets/rocket.png'
import Calendar from '../../components/DashboardComponents/Calendar'
import { SiOpenai } from 'react-icons/si'
import { useRouter } from 'next/navigation'

export default function page() {
  const router = useRouter()
  const handleClick = () => {
    router.push('/profile')
  }

  return (
    <main className="w-full flex flex-col justify-center items-center relative">

    {/* Hero Section */}
      <div className=" bg-white bg-opacity-50 rounded-lg shadow-lg absolute p-4 m-4 text-center">
        <div className="hero-content text-center">
          <div className="max-w-sm">
            <h1 className="text-2xl font-bold">You don't have any projects yet!</h1>
            <Image src={rocket} alt="rocket" className="my-3" styles={{ width: "width" || 100, height: "height" || 100 }} priority/>
            <button onClick={handleClick} className="btn btn-accent text-bold text-xl rounded-full px-4 text-white">Start your first</button>
          </div>
        </div>
      </div>        

    {/* Alternating colored rectangles */}
      <div className="shadow-lg flex flex-col w-full mt-20">
        <div className="h-20 w-full bg-blue-200"></div>
        <div className="h-20 w-full bg-gray-200"></div>
        <div className="h-20 w-full bg-blue-200"></div>
        <div className="h-20 w-full bg-gray-200"></div>
        <div className="h-20 w-full bg-blue-200"></div>
        <div className="h-20 w-full bg-gray-200"></div>
        <div className="h-20 w-full bg-blue-200"></div>
        <div className="h-20 w-full bg-gray-200"></div>
        <div className="h-20 w-full bg-blue-200"></div>
        <div className="h-20 w-full bg-gray-200"></div>
        <div className="h-20 w-full bg-blue-200"></div>
      </div>
    
    {/* Ai Bot */}
      <div className="chat chat-end absolute right-4 bottom-4 pt-16">
        <div className="chat-bubble bg-white text-black max-w-[50%] font-semibold leading-6">Power bot is here whenever you need help!</div>
        <SiOpenai size={40} className="text-blue-500 ml-3"/>
      </div>  

      <div>
        {/* Projects and button */}
          <div className="absolute top-4 left-4 gap-2">
              <h1 className="text-2xl font-bold top-0 left-0">Projects</h1>
              <button className="btn btn-primary text-white">Add new</button>
          </div>
          
        {/* Date */}
          <div className="absolute right-4 top-4">
            <Calendar />
          </div>        
      </div>
    </main>
  )
}