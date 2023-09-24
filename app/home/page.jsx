'use client'
import React from 'react';
import { useUser } from '../../context/UserContext';


export default function DashboardPage() {

    const { currentUser } = useUser();
    console.log(currentUser)

    return (
        <div>
            <h1 className='text-2xl underline'>Home</h1>
            <h1>``  </h1>
        </div>
    )
}