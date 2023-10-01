'use client'
import React from 'react';
import { useUser } from '../../context/UserContext';
import EssayPlanner from '../../components/DashboardComponents/EssayPlanner';

export default function HomePage() {

    const { currentUser } = useUser();
    console.log(currentUser)

    return (
        <main>
          <h1>Home</h1>
          <EssayPlanner />
        </main>
    )
}