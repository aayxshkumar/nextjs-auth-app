"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function ProfilePage() {

    const router = useRouter();
    const [data, setData] = useState("nothing")

    const logout = () => {
        try {
            axios.get("/api/users/logout");
            toast.success("Logout success");
        } catch (error: any) {
            console.log("Logout error", error.message);
            toast.error(error.message);

        }

    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        setData(res.data.data._id);
        console.log(res.data);
    }

    return (

        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={logout}
            >Logout</button>

            <button
                className="bg-green-900 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={getUserDetails}
            >Get User Details</button>
        </div>
    )
}
