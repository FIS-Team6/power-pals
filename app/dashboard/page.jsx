'use client'
import React, {useState} from 'react';
import AITest from '../../components/DashboardComponents/AITest';
import GPTComponent from '../../components/DashboardComponents/gpt';
import NewTask from '../../components/DashboardComponents/NewTask';



export default function DashboardPage() {
    const [taskFormData, setTaskFormData] = useState({})

    return (
        <main>
            <h1 className=''>Dashboard</h1>
            <NewTask setTaskFormData={setTaskFormData} />
            <GPTComponent taskFormData={taskFormData} />
            {/* <AITest /> */}
        </main>
    )
}