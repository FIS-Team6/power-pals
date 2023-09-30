import React, { useState, useContext } from 'react';



export default function AssignmentPreviewPreview({taskFormData, aiDataForFirestore}) {

    if(!taskFormData || !aiDataForFirestore) return(<div>loading...</div>)
    console.log(typeof(aiDataForFirestore))
    console.log(aiDataForFirestore)

    return (
        <div>
            <h1>Preview</h1>
            <p>{taskFormData.name}</p>
            <p>{taskFormData.type}</p>
            <p>{taskFormData.startDate}</p>
            <p>{taskFormData.dueDate}</p>
            <p>{taskFormData.assignment}</p>
            <p>{taskFormData.numTasks}</p>
            <p>{taskFormData.subtasksMin}</p>
            <p>{taskFormData.subtasksMax}</p>
            <p>{taskFormData.tasks}</p>
            <div>
                {aiDataForFirestore?.map((task) => {
                    return(
                        <div>
                            <h3>{task.name}</h3>
                            <h3>{task.description}</h3>
                            <ul>
                                {task.task.subtasks.map((subtask) => {
                                    return(
                                        <li>{subtask}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}