"use client"
import { signOut } from "next-auth/react";

// Client-side SignIn Component
export default function SignIn() {
    return (
        <button onClick={() => signOut()} className="">
            Sign Out
        </button>
    );
}