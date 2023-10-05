"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

const showModal = async () => {
    try {
        const modalElement = document.getElementById("update-profile");
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
        const modalElement = document.getElementById("update-profile");
        const bodyElement = document.body;

        if (modalElement && bodyElement) {
            modalElement.close();
            bodyElement.classList.remove("backdrop-blur-lg", "bg-slate-800");
        }
    } catch (error) {
        console.error("Error closing modal:", error);
    }
};

export default function UpdateProfileModal() {
    const [dueDate, setDueDate] = useState("");

    return (
        <div className="container flex  justify-center items-center ">
            <button className="btn relative flex" onClick={showModal}>
                Update Profile
            </button>
            <dialog
                id="update-profile"
                className="modal modal-bottom lg:modal-middle min-h-[50%] bg-slate-500 border-2"
                onClose={closeModal}
            >
                Welcome to the Placeholder for Profile update form

                <button className="btn" onClick={closeModal}>
                Close Modal
            </button>
                </dialog>
        </div>
    );
}
