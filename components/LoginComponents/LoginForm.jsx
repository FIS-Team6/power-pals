// 'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import { signIn } from "../../server/firebase-auth";
import { useUser } from "../../context/UserContext";

export default function LoginForm() {
    const { currentUser } = useUser();
    const [authFormData, setAuthFormData] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuthFormData({ ...authFormData, [name]: value });
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
        <form
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
        >
            <input
                className="border rounded p-2 mb-3 w-full "
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
            />
            <input
                className="border rounded p-2 mb-3 w-full"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
            />
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                onClick={handleSignIn}
            >
                Sign In
            </button>
        </form>
    );
}
