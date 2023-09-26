import React from 'react';
import AITest from '../../components/DashboardComponents/AITest';
import GPTComponent from '../../components/DashboardComponents/gpt';
import NewTask from '../../components/DashboardComponents/NewTask';



export default function DashboardPage() {

    return (
        <main>
            <h1 className=''>Dashboard</h1>
            <NewTask />
            <GPTComponent />
            
            {/* <AITest /> */}
        </main>
    )
}