"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

const showModal = async () => {
    try {
        const modalElement = document.getElementById("new-task");
        const bodyElement = document.body;

        if (modalElement && bodyElement) {
            modalElement.showModal();
            bodyElement.classList.add("backdrop-blur-lg", "bg-slate-800");
        }
    } catch (error) {
        console.error("Error showing modal:", error);
    }
};

const closeModal = async () => {
    try {
        const modalElement = document.getElementById("new-task");
        const bodyElement = document.body;

        if (modalElement && bodyElement) {
            modalElement.close();
            bodyElement.classList.remove("backdrop-blur-lg", "bg-slate-800");
        }
    } catch (error) {
        console.error("Error closing modal:", error);
    }
};

export default function NewTask() {
    const [dueDate, setDueDate] = useState("");

    return (
        <div className="container">
            <button className="btn" onClick={showModal}>
                Add Task
            </button>
            <dialog
                id="new-task"
                className="modal modal-bottom lg:modal-middle min-h-[50%]"
                onClose={closeModal}
            >
                <div className="modal-box flex flex-grow bg-red-500">
                    <div className="modal-action flex flex-col relative">
                        <form
                            className="flex flex-col relative"
                            method="dialog"
                        >
                            <input
                                className="relative mb-2"
                                type="text"
                                placeholder="Task Name"
                            />
                            <textarea
                                className="mb-2 flex-grow"
                                type="text"
                                placeholder="Task Description"
                            />
                            <div className="flex flex-row">

                                <div>
                                    <label>To:</label>
                                    <DatePicker
                                        selected={dueDate}
                                        onChange={(date) => setDueDate(date)} //only when value has changed
                                    />
                                </div>
                            </div>
                            <button className="btn " type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
