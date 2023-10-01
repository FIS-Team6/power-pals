'use client'

import React from 'react'
import Link from 'next/link'
import { useUser } from '../../context/UserContext';
import { useRouter } from 'next/navigation'
import { signOut } from '../../server/firebase-auth';
import { LuNewspaper } from 'react-icons/lu'

export default function NavBar() {
    const router = useRouter();
    const { currentUser, userLoggedIn } = useUser();
  
    const handleSignOut = () => {
      if (userLoggedIn) {
        signOut();
        router.push('/');
      }
  
      if (!userLoggedIn) {
        router.push('/login');
      }
    };
      
    return (
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center text-blue-600">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" /> */}
              <LuNewspaper size={30} className="text-blue-600"/>
              <span className="text-blue-600 self-center text-4xl font-semibold whitespace-nowrap dark:text-white px-2">EZ-Essay</span>
          </Link>
          <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <Link href="/home" className="block py-2 pl-3 pr-4 text-blue-700 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</Link>
              </li>
              <li>
                <Link href="/dashboard" className="block py-2 pl-3 pr-4 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Dashboard</Link>
              </li>
              <li>
                <Link href="/profile" className="block py-2 pl-3 pr-4 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile</Link>
              </li>
              <li>
                <button onClick={handleSignOut} className="block py-2 pl-3 pr-4 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{currentUser ? 'Logout' : 'Log In'}</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }