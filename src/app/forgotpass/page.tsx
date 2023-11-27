"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ForgotPasswordPage(){
    const [user, setUser] = useState({
        email: ""
    });
    const [isLoading, setLoading] = useState(false);
    const [reset, setReset] = useState(false);
    const [attempted, setAttempted] = useState(false);

    const forgotPassword = async() => {
        try {
            setLoading(true);
            const resp = await axios.post('/api/users/forgotpass', user);
            console.log(resp);
            if(resp.data.data.email === user.email){
                setReset(true);
            }
        } catch (error: any) {
            console.log(error.message);
            setAttempted(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0){
            setAttempted(false);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            { !reset && (
                <div className="flex flex-col items-center justify-center min-h-screen py-3">
                    <h1>{isLoading ? "Processing":"Forgot Password"}</h1>
                    <hr />
                    <label htmlFor="email">Email</label>
                    <input
                        className="p-2 border border-gray-300 rounded-gl mb-4 focus:outline-none focus:border-gray-600 text-black"
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        placeholder="email"
                        />
                    <button 
                        className="p-2 border border-gray-300 rounded-gl mb-4 focus:outline-none focus:border-gray-600"
                        onClick={forgotPassword}>Reset Password</button>
                    { attempted && (<span className="bg-yellow-500 text-red">Email doesnt exists!</span>)}
                    <Link href="/login">Go to login</Link>
                </div>
            )}
            { reset && (
                <div className="flex flex-col items-center justify-center min-h-screen py-3">
                    <h1>Password Reset</h1>
                    <p>A reset link has been emailed to your registered email address: <span>{user.email}</span></p>
                    <Link href="/login">Go to login</Link>

                </div>
            )}
        </div>
    );
}