'use client'
import React from 'react';
import { useUser } from '../../context/UserContext';
import { navTo } from '../../utils/navigation';
import { signOut } from '../../server/firebase-auth';



export default function NavBar() {

    const handleSignOut = () => {
        if (userLoggedIn) {
            signOut();
            navTo('/')
        }

        if (!userLoggedIn) {
            navTo('/login')
        }
    }

    const handleClick = (link) => {
        navTo(link)
    }

    const { currentUser, userLoggedIn } = useUser();

    return (
        <div className='w-full min-h-[50px] flex justify-between items-center absolute z-10 text-white bg-gray-700/80'>
            <div className='flex text-center items-center justify-between'>
                <ul className = 'h-full w-full text-center pt-12'>
                    <li classNam="p-4">
                    <a href="/home">Home</a>
                    </li>
                    <li classNam="p-4">
                    <a href="/dashboard">Dashboard</a>
                    </li>
                    <li classNam="p-4">
                    <a href="/profile">Profile</a>
                    </li>
                </ul>
            </div>
            <div className='flex'>
                <button onClick={handleSignOut} className='text-2xl '>{userLoggedIn ? "Sign Out" : "Sign In"}</button>
            </div>
        </div>
    )
}