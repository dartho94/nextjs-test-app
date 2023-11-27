"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const resp = await axios.post("/api/users/login", user);
            console.log("Login success", resp);
            toast.success("Logged in!");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login Failed", error.message);
            toast.error(error.message)
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        if(user.password.length > 0 && user.email.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl p-5">{isLoading ? "Logging in..." : "Login"}</h1>
            <hr />
            <label htmlFor="email">E-Mail</label>
            <input
                className="p-3 border border-gray-300 rounded-gl mb-4 focus:outline-none focus:border-orange-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
                />
            <label htmlFor="password">Password</label>
            <input
                className="p-3 border border-gray-300 rounded-gl mb-4 focus:outline-none focus:border-orange-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
                />
            <button 
                className="p-2 border border-gray-300 rounded-gl mb-4 focus:outline-none hover:border-orange-600"
                onClick={onLogin}>Login</button>
            <Link href="/signup">Signup</Link>
            <Link href="/forgotpass">Forgot Password</Link>
        </div>
    );
}