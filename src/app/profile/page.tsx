"use client";
import axios from "axios";
import Link from "next/link";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("User Logged out");
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async() => {
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data._id);
    };

    useEffect(() => {
        getUserDetails();
    },[]);

    return (
        <div className="flex flex-col items-center justify-center  min-h-screen py-2">
            <h1 className="text-4xl p-5">Profile</h1>
            <hr />
            <h2 className="p-1 rounded m-5 bg-green-500">{data === "" ? "Nothing": <Link href={`/profile/${data}`}>My Profile</Link>}</h2>
            <hr />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
            {/* <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getUserDetails}>Get User Details</button> */}
        </div>
    );
}