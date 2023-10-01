'use client'
import React, {useState} from 'react';
import AITest from '../../components/DashboardComponents/AITest';
import GPTComponent from '../../components/DashboardComponents/gpt';
import NewTask from '../../components/DashboardComponents/NewTask';
import AssignmentPreviewPreview from '../../components/DashboardComponents/AssignmentPreview';
import EssayPlanner from '../../components/DashboardComponents/EssayPlanner';
import { useUser } from '../../context/UserContext';



export default function DashboardPage() {

    const { currentUser} = useUser();

    const [taskFormData, setTaskFormData] = useState({
        uid: currentUser?.id && "",
        name: "",
        subject: "",
        startDate: "",
        dueDate: "",
        assignment: "",
        numTasks: 0,
        subTasksMin: 0,
        subTasksMax: 0,
    })
    const [aiDataForFirestore, setAiDataForFirestore] = useState([])

    return (
        <main className="text-center py-20">
            <EssayPlanner taskFormData={taskFormData} setTaskFormData={setTaskFormData} />
            {/* <NewTask setTaskFormData={setTaskFormData} /> */}
            <AssignmentPreviewPreview taskFormData={taskFormData} aiDataForFirestore={aiDataForFirestore}/>
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