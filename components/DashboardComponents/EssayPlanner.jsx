"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useChat } from "ai/react";

export default function EssayPlanner({ taskFormData, setTaskFormData }) {
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [brainstorming, setBrainstorming] = useState("");
    const [tasks, setTasks] = useState([
        "Task 1",
        "Task 2",
        "Task 3",
        "Task 4",
        "Task 5",
    ]);
    const [finalReadDate, setFinalReadDate] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setTaskFormData({ ...taskFormData, [name]: value });
        // console.log(taskFormData);
    };

    const {
      messages,
      input,
      setInput,
      // handleInputChange,
      handleSubmit,
      onResponse,
      isLoading,
  } = useChat({
      api: "/api/chat",
  });

    useEffect(() => {
      console.log(taskFormData);
    },[taskFormData])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here, e.g., store the data, calculate task deadlines, etc.
        // You can create an array of task deadlines based on the start and end date.
        setModalOpen(false);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="container">
            <button className="btn" onClick={openModal}>
                Add Essay Planner
            </button>
            <dialog
                open={modalOpen}
                id="new-essay"
                className=" text-red-500 modal modal-bottom lg:modal-middle min-h-[50%]"
                onClose={closeModal}
            >
                <div className="modal-box flex flex-grow bg-red-500">
                    <div className="modal-action flex flex-col relative">
                        <form
                            className="flex flex-col relative"
                            onSubmit={handleFormSubmit}
                        >
                                                      <input
                                className="relative mb-2 text-slate-500 z-20 opacity-100"
                                type="text"
                                placeholder="Enter name for assignment"
                                value={taskFormData?.name}
                                name="name"
                                onChange={(e) => handleInputChange(e)}
                            />
                            <input
                                className="relative mb-2 text-slate-500 z-20 opacity-100"
                                type="text"
                                placeholder="Essay Subject"
                                value={taskFormData?.subject}
                                name="subject"
                                onChange={(e) => handleInputChange(e)}
                            />
                            <textarea
                                className="mb-2 flex-grow"
                                placeholder="Essay Requirements"
                                value={taskFormData?.assignment}
                                name="assignment"
                                onChange={(e) => handleInputChange(e)}
                            />
                            <div className="flex flex-row">
                                <div>
                                    <label>Start Date:</label>
                                    <DatePicker
                                        className="w-auto"
                                        selected={
                                            taskFormData?.startDate
                                                ? new Date(
                                                      taskFormData.startDate
                                                  )
                                                : null
                                        }
                                        onChange={(date) =>
                                            setTaskFormData({
                                                ...taskFormData,
                                                startDate: date
                                                    ? date.toDateString()
                                                    : null,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label>End Date:</label>
                                    <DatePicker
                                        className="w-auto"
                                        selected={
                                            taskFormData?.dueDate
                                                ? new Date(
                                                      taskFormData?.dueDate
                                                  )
                                                : null
                                        }
                                        onChange={(date) =>
                                            setTaskFormData({
                                                ...taskFormData,
                                                dueDate: date
                                                    ? date.toDateString()
                                                    : null,
                                            })
                                        }
                                        
                                    />

                                </div>
                            </div>
                            <label>Number of main sections to break assignment into:</label>
                            <select defaultValue={3} name="numTasks"  onChange={(e)=>handleInputChange(e)}>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                            </select>
                <label>Minimum number of tasks per section:</label>
                       
                            <select defaultValue={2} name="subTasksMin"  onChange={(e)=>handleInputChange(e)}>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                              <option value={5}>5</option>
                            </select>
                           
                    <label>Maximum Number of Tasks per section:</label> 
                            <select defaultValue={3} name="subTasksMax"  onChange={(e)=>handleInputChange(e)}>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                              <option value={5}>5</option>
                            </select>
 
                            <button className="btn" type="submit">
                                Create Essay Planner
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* Display Essay Planner Timeline */}
            {subject && startDate && endDate && (
                <div className="essay-timeline">
                    <h2>{subject}</h2>
                    <p>Essay Requirements: {description}</p>
                    <p>Start Date: {startDate.toDateString()}</p>
                    <p>End Date: {endDate.toDateString()}</p>
                    <h3>Brainstorming Ideas</h3>
                    <p>{brainstorming}</p>
                    <h3>Task Management</h3>
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={index}>{task}</li>
                        ))}
                    </ul>
                    <div>
                        <label>Final Read-Through Date:</label>
                        <DatePicker
                            selected={finalReadDate}
                            onChange={(date) => setFinalReadDate(date)}
                        />
                    </div>
                    <button className="btn" onClick={submitEssay}>
                        Submit Essay
                    </button>
                </div>
            )}
        </div>
    );
}
