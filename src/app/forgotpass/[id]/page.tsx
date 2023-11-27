"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ChangeUserPassword({params}: any) {
    const [user, setUser] = useState({
        token: "",
        _id: params.id,
        password: "",
        cpassword: "",

    });

    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const changePassword = async () => {
        try {
            const resp = await axios.post('/api/users/changepass', user);
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1] || "";
        setUser({...user, token: urlToken});
    },[]);

    useEffect(() => {
        if(user.password.length > 0 && user.cpassword.length > 0 && user.token.length > 0){
            if(user.password === user.cpassword){
                setButtonDisabled(false);
            } else{
                setButtonDisabled(true);
            }
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Reset Password</h1>
            <h2 className="p-2 bg-gray-500 text-black">{user.token ? `${user.token}` : "no token"}</h2>
            <hr />
        {(verified === false && error === false) && (
            <div className="flex flex-col items-center justify-center min-h-screen py-3">
                <label htmlFor="password">New Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-gl mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="password"
                    />
                <label htmlFor="cpassword">Confirm New Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-gl mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="cpassword"
                    type="password"
                    value={user.cpassword}
                    onChange={(e) => setUser({...user, cpassword: e.target.value})}
                    placeholder="Confirm password"
                    />
                <button 
                    className="p-2 border border-gray-300 rounded-gl mb-4 focus:outline-none focus:border-gray-600"
                    onClick={changePassword} disabled={buttonDisabled}>Change Password</button>
            </div>
        )}
        {verified  && (
            <div className="flex flex-col items-center justify-center min-h-screen py-3">
                <h2 className="text-2xl">Password changed successfully</h2>
                <Link href="/login">Login</Link>
            </div>
        )}
        {error  && (
            <div className="flex flex-col items-center justify-center min-h-screen py-3">
                <h2 className="text-2xl bg-red-500 text-black">Error resetting password</h2>
            </div>
        )}
        </div>
    )
}