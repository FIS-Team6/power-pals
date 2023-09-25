'use client'
import React, { useState } from 'react';
import { signIn } from "../../server/firebase-auth";
import { useUser } from "../../context/UserContext";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export default function LoginPage() {
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
        <main>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Additional Text</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="transform">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type={passwordVisible ? "text" : "password"} placeholder="password" className="input input-bordered" />
                    <span
                        className="text-lg relative"
                        style={{
                            color: "teal",
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
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        <div className="form-control mt-6">
                        <button onClick={handleSignIn} className="btn btn-primary">Login</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </main>
    )
}