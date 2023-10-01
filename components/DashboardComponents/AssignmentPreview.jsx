import React, { useState, useContext, useEffect } from 'react';
import { timestampToDate } from '../../server/firebase-functions';



export default function AssignmentPreviewPreview({finalPreview, setFinalPreview, taskFormData, aiDataForFirestore, preview, setPreview}) {

    if(!taskFormData || !aiDataForFirestore) return(<div>loading...</div>)
    useEffect(() => {
        console.log("pre FB data test")
        console.log(typeof(aiDataForFirestore))
        console.log(aiDataForFirestore)
        console.log(typeof(taskFormData))
        console.log(taskFormData)
        
    },[aiDataForFirestore])

    if (!preview) return <></>
    return (
        <div className='flex justify-center items-center p-5'>
            <div className='Settings Window  rounded-lg shadow-xl border-1 p-3 my-5 mx-10'>
            <h1 className="text-xl font-semibold mb-2">Assignment Preview</h1>
            <ul>
                <li className="border-1 my-3 py-3">Name: {taskFormData.name}</li>
                <li className="border-1 my-3 py-3">Type: {taskFormData.type}</li>
                <li className="border-1 my-3 py-3">Start Date: {taskFormData.startDate}</li>
                <li className="border-1 my-3 py-3">Due Date: {taskFormData.dueDate}</li>
                <li className="border-1 my-3 py-3">{taskFormData.assignment}</li>
                <li className="border-1 my-3 py-3">Sections: {taskFormData.numTasks}</li>
            </ul>
            </div>
            <div className='mx-10'>
                {aiDataForFirestore?.map((task) => {
                    return(
                        <div key={task.name} className='border-1 my-5 p-3'>
                            <h3 className='text-xl font-semibold mb-2'>Category: {task.name}</h3>
                            <h3 className="mb-2">{task.description}</h3>
                            <h3 className="mb-2">Due Date: {timestampToDate(task.dueDate)}</h3>
                            <ul>
                                <h3 className="mb-2">Tasks:</h3>
                                <div className='flex flex-col space-y-3'>
                                {task.subTasks.map((subtask) => {
                                    return(
                                        <div className='border-1 p-3 m-3  bg-slate-300' key={subtask.name}>
                                            <li className='text-thin'>{subtask.name}</li>
                                        </div>
                                    )
                                })}

                                </div>
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}