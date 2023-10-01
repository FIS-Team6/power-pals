"use client";
import React, { useState } from "react";
import AITest from "../../components/DashboardComponents/AITest";
import GPTComponent from "../../components/DashboardComponents/gpt";
import NewTask from "../../components/DashboardComponents/NewTask";
import AssignmentPreviewPreview from "../../components/DashboardComponents/AssignmentPreview";
import EssayPlanner from "../../components/DashboardComponents/EssayPlanner";
import { useUser } from "../../context/UserContext";

export default function DashboardPage() {
    const { currentUser } = useUser();
    const [preview, setPreview] = useState(false);
    const [continueReady, setContinueReady] = useState(false);

    const [taskFormData, setTaskFormData] = useState({
        uid: currentUser ? currentUser.id : "1",
        name: "",
        subject: "",
        startDate: "",
        dueDate: "",
        assignment: "",
        numTasks: 0,
        subTasksMin: 0,
        subTasksMax: 0,
    });

    const [aiDataForFirestore, setAiDataForFirestore] = useState([]);

    return (
        <main className="text-center py-20">
            <EssayPlanner
                preview={preview}
                setPreview={setPreview}
                continueReady={continueReady}
                setContinueReady={setContinueReady}
                taskFormData={taskFormData}
                setTaskFormData={setTaskFormData}
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
                    />
                    <GPTComponent
                        preview={preview}
                        aiDataForFirestore={aiDataForFirestore}
                        setAiDataForFirestore={setAiDataForFirestore}
                        taskFormData={taskFormData}
                        setTaskFormData={setTaskFormData}
                    />
                </div>
            )}
            {/* <AITest /> */}
        </main>
    );
}
