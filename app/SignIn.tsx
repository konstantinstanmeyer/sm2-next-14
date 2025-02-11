"use client"
import { signIn } from "next-auth/react";

// Client-side SignIn Component
export default function SignIn({ randomMessage }: { randomMessage: string }) {

    console.log(randomMessage);
    return (
        <button onClick={() => signIn("google")} className="flex flex-row items-center border-black border-r-[1.5px] pr-2">
            <div className="ml-2 h-4 w-4 relative">
                <img className="h-full" src="/gambling.png" />
            </div>
            {/* Display the random message */}
            <p className="text-base pixelify ml-2 hidden md:block">{randomMessage}</p>
            <p className="text-base pixelify ml-2 block md:hidden">Sign in</p>
        </button>
    );
}