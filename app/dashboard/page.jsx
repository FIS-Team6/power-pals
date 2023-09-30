'use client'
import React, {useState} from 'react';
import AITest from '../../components/DashboardComponents/AITest';
import GPTComponent from '../../components/DashboardComponents/gpt';
import NewTask from '../../components/DashboardComponents/NewTask';
import AssignmentPreviewPreview from '../../components/DashboardComponents/AssignmentPreview';



export default function DashboardPage() {
    const [taskFormData, setTaskFormData] = useState({})
    const [aiDataForFirestore, setAiDataForFirestore] = useState([])

    return (
        <main>
            <h1 className=''>Dashboard</h1>
            {/* <NewTask setTaskFormData={setTaskFormData} /> */}
            {/* <AssignmentPreviewPreview taskFormData={taskFormData} aiDataForFirestore={aiDataForFirestore}/> */}
            <GPTComponent
            aiDataForFirestore={aiDataForFirestore}
            setAiDataForFirestore={setAiDataForFirestore}
            taskFormData={taskFormData}
            setTaskFormData={setTaskFormData}
            />
            {/* <AITest /> */}
        </main>
    )
}