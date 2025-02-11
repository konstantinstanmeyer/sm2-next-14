"use client"
import { signOut } from "next-auth/react";

// Client-side SignIn Component
export default function SignIn() {
    return (
        <button onClick={() => signOut()} className="flex flex-row px-2 items-center border-black border-l-[1.5px]">
            <p className="text-base pixelify block">Sign Out</p>
        </button>
    );
}