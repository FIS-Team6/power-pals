import React, { useState, useContext } from 'react';
import { timestampToDate } from '../../server/firebase-functions';



export default function AssignmentPreviewPreview({taskFormData, aiDataForFirestore}) {

    if(!taskFormData || !aiDataForFirestore) return(<div>loading...</div>)
    console.log(typeof(aiDataForFirestore))
    console.log(aiDataForFirestore)

    return (
        <div className='p-5'>
            <div className='Settings Window border-2 m-5'>
            <h1>Assignment Preview</h1>
            <li>Name: {taskFormData.name}</li>
            <li>Type: {taskFormData.type}</li>
            <li>Start Date: {taskFormData.startDate}</li>
            <li>Due Date: {taskFormData.dueDate}</li>
            <li>{taskFormData.assignment}</li>
            <li>Sections: {taskFormData.numTasks}</li>
            </div>
            <div className='m-5'>
                {aiDataForFirestore?.map((task) => {
                    return(
                        <div key={task.name} className='border-2 m-5'>
                            <h3>Category: {task.name}</h3>
                            <h3>{task.description}</h3>
                            <h3>Due Date: {timestampToDate(task.dueDate)}</h3>
                            <ul>
                                <h3>Tasks:</h3>
                                <div className='flex flex-col p-3 m-3'>
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