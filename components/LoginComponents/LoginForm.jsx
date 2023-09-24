// 'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import { signIn } from "../../server/firebase-auth";
import { useUser } from "../../context/UserContext";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export default function LoginForm() {
    const { currentUser } = useUser();
    const [authFormData, setAuthFormData] = useState(null);

    const [passwordVisible, setPasswordVisible] = useState(false);
    const icon = passwordVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuthFormData({ ...authFormData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevVisible) => !prevVisible);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        const email = authFormData?.email;
        const password = authFormData?.password;

        if (!email || !password) {
            return;
        }

        try {
            await signIn(email, password);
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    return (
        <div className="w-full relative">
            <div className="mt-6">
                <form
                    initial={{ x: -200 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <div className="mx-auto max-w-lg">
                        <div className="py-2">
                            <span className="px-1 text-sm">
                                Email
                            </span>
                            <input
                                className="border rounded p-2 mb-3 w-full "
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="py-2">
                            <span className="px-1 text-sm text-gray-600">
                                Password
                            </span>
                            <div className="relative">
                                <input
                                    className="border rounded p-2 mb-3 w-full"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleInputChange}
                                />
                                <span
                                    className="text-dark text-lg bg-yellow-50 absolute"
                                    style={{
                                        position: "relative",
                                        top: "8px",
                                        right: "10px",
                                        zIndex: "1000",
                                        cursor: "pointer",
                                    }}
                                    onClick={togglePasswordVisibility}
                                >
                                    {icon}
                                </span>
                            </div>
                        </div>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                            onClick={handleSignIn}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
