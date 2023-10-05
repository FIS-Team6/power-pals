"use client";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { MdOutlineNotificationsActive } from "react-icons/md";

export default function Sidebar() {
    const { currentUser } = useUser();
    const [notifications, setNotifications] = useState([]);

    const UserInfoPane = () => {
        return (
            <div className="flex flex-row  border-2 justify-between p-2">
                <div className="rounded-full m-5  overflow-hidden">
                    <img
                        className="rounded-full h-20  object-cover"
                        src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                        alt="profile-image"
                    ></img>
                </div>
                <div className="flex flex-col ">
                    <h1>Welcome back!</h1>
                    <button type='btn' className="w-full border-2 flex flex-row justify-around p-1 rounded-md bg-opacity-50 bg-green-900 hover:bg-green-500 hover:rounded-full">
    <MdOutlineNotificationsActive className="text-red-500 flex justify-center bg-opacity-0" />
    <h3>See Messages</h3>
</button>

                </div>
            </div>
        );
    };

    return (
        <div className="relative border-2 h-full flex flex-col justify-around">
            <UserInfoPane />
        </div>
    );
}
