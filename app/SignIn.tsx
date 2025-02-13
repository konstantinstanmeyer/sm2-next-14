"use client"
import { signIn } from "next-auth/react";

// Client-side SignIn Component
export default function SignIn() {
    return (
        <button onClick={() => signIn("google")} className="" >
            {/* Display the random message */}
            Sign In
        </button>
    );
}