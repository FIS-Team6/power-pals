'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { signUp } from "../../server/firebase-auth";

export default function SignUpForm() {
    const [authFormData, setAuthFormData] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuthFormData({ ...authFormData, [name]: value });
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        signUp(authFormData);
    };

    return (
        <form
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <input
                className="border rounded p-2 mb-3 w-full"
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
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                onClick={handleSignUp}
            >
                Sign Up
            </button>
        </form>
    );
}
