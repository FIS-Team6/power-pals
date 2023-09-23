'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function Login() {
    const [hasAccount, setHasAccount] = useState(true);

    return (
        <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center border-2 h-[80vh] border-white"
        >
            <h1 className="text-4xl mb-4">
                {hasAccount ? "Login" : "Sign Up"}
            </h1>
            {hasAccount ? <LoginForm /> : <SignUpForm />}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300"
                onClick={() => setHasAccount(!hasAccount)}
            >
                Switch to {hasAccount ? "Sign Up" : "Login"}
            </button>
        </div>
    );
}
