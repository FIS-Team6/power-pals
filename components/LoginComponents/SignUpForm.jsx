"use client";
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
        console.log('handle signup clicked ', authFormData)
    };

    return (
        <form onSubmit={handleSignUp}>
        <div className="mb-6">
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input onChange={handleInputChange} type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
        </div>
        <div className="mb-6">
            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input onChange={handleInputChange} type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
        </div>
        <div className="mb-6">
            <label for="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
            <input onChange={handleInputChange} type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
        </div>
        <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
            <input onChange={handleInputChange} id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
            </div>
            <label for="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
        </form>       
    );
}
