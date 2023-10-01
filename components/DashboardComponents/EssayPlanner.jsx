'use client'
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function EssayPlanner() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [brainstorming, setBrainstorming] = useState("");
  const [tasks, setTasks] = useState(["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"]);
  const [finalReadDate, setFinalReadDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., store the data, calculate task deadlines, etc.
    // You can create an array of task deadlines based on the start and end date.
    setModalOpen(false)
  };

  const openModal = () => {
    modalOpen(true);
  };

  const closeModal = () => {
    modalOpen(false);
  };
  return (
    <div className="container">
      <button className="btn" onClick={openModal}>
        Add Essay Planner
      </button>
      <dialog id="new-essay" className="modal modal-bottom lg:modal-middle min-h-[50%]" onClose={closeModal}>
        <div className="modal-box flex flex-grow bg-red-500">
          <div className="modal-action flex flex-col relative">
            <form className="flex flex-col relative" onSubmit={handleFormSubmit}>
              <input
                className="relative mb-2"
                type="text"
                placeholder="Essay Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <textarea
                className="mb-2 flex-grow"
                placeholder="Essay Requirements"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex flex-row">
                <div>
                  <label>From:</label>
                  <DatePicker
                    className="w-auto"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div>
                  <label>To:</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
              </div>
              <textarea
                className="mb-2 flex-grow"
                placeholder="Brainstorming Ideas"
                value={brainstorming}
                onChange={(e) => setBrainstorming(e.target.value)}
              />
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
