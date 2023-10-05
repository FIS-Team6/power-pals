"use client";
import React, { useState } from "react";
import AITest from "../../components/DashboardComponents/AITest";
import GPTComponent from "../../components/DashboardComponents/gpt";
import NewTask from "../../components/DashboardComponents/NewTask";
import AssignmentPreviewPreview from "../../components/DashboardComponents/AssignmentPreview";
import EssayPlanner from "../../components/DashboardComponents/EssayPlanner";
import { useUser } from "../../context/UserContext";
import { createNewAssignment } from "../../server/firebase-functions";
import Sidebar from "../../components/DashboardComponents/Sidebar";

export default function DashboardPage() {
    const { currentUser } = useUser();
    const [preview, setPreview] = useState(false);
    const [finalPreview, setFinalPreview] = useState(false);
    const [continueReady, setContinueReady] = useState(false);

    

    const [taskFormData, setTaskFormData] = useState({
        uid: currentUser ? currentUser.id : "GhrLewFFxjaHliTR7Ea5TGTo3S43",
        name: "Final Paper",
        subject: "English",
        startDate: "10/5/2023",
        dueDate: "10/15/2023",
        assignment: "write 5 page paper on different types of insects. include pros and cons to the environment.",
        numTasks: 2,
        subTasksMin: 2,
        subTasksMax: 3,
    });

    const [aiDataForFirestore, setAiDataForFirestore] = useState([]);

    const handleSaveAssignment = async () => {
        try {
            const newAssignment = await createNewAssignment(taskFormData, aiDataForFirestore); //
            console.log(newAssignment);
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <div className="text-center  h-[80vh] flex flex-row pm-0">
            <div className='w-1/5'>
            <Sidebar />
            </div>

            <div className="workspace---class-name-can-change-later relative">
            <EssayPlanner
                preview={preview}
                setPreview={setPreview}
                continueReady={continueReady}
                setContinueReady={setContinueReady}
                taskFormData={taskFormData}
                setTaskFormData={setTaskFormData}
                setFinalPreview={setFinalPreview}
                />
            {/* <NewTask setTaskFormData={setTaskFormData} /> */}

            {!preview ? (
                <></>
                ) : (
                    <div>
                    <AssignmentPreviewPreview
                        preview={preview}
                        setPreview={setPreview}
                        taskFormData={taskFormData}
                        aiDataForFirestore={aiDataForFirestore}
                        finalPreview={finalPreview}
                        setFinalPreview={setFinalPreview}
                        />
                    <GPTComponent
                        preview={preview}
                        finalPreview={finalPreview}
                        aiDataForFirestore={aiDataForFirestore}
                        setAiDataForFirestore={setAiDataForFirestore}
                        taskFormData={taskFormData}
                        setTaskFormData={setTaskFormData}
                        setFinalPreview={setFinalPreview}
                        />
                </div>
            )}
            {/* <AITest /> */}
            {!finalPreview ?
            null :
            <button className='saveToFireStoreBtn' type='btn' onClick={handleSaveAssignment}>Confirm</button>
        }
        </div>
        </div>
    );
}
