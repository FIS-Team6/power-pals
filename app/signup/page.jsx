"use client";
import React, { useState } from "react";
import Link from 'next/link'
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
      <main>
          <div className="relative flex flex-col justify-center h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700">DaisyUI</h1>
                <form onSubmit={handleSignUp} className="space-y-4">                   
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input name='email' onChange={handleInputChange} type="email" placeholder="Email Address" className="w-full input input-bordered input-primary" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input name='password' onChange={handleInputChange} type="password" placeholder="Enter Password"
                            className="w-full input input-bordered input-primary" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>
                        <input name='password' onChange={handleInputChange} type="password" placeholder="Confirm Password"
                            className="w-full input input-bordered input-primary" />
                    </div>
                    <div>
                        <button className="btn btn-block btn-primary">Sign Up</button>
                    </div>
                    <span>Already have an account ?
                        <Link href="/login" className="text-blue-600 hover:text-blue-800 hover:underline">Login</Link></span>
                </form>
            </div>
        </div>      
      </main>
    );
}

