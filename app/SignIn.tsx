"use client"
import { signIn } from "next-auth/react"

export default function SignIn(){
    return(
        <button onClick={() => signIn("google")} className="flex flex-row items-center border-black border-r-[1.5px] pr-2" href="/">
            <img className="ml-2 h-4" src="/gambling.png" />
            <p className="text-base pixelify ml-2 hidden md:block">Hello</p>
            <p className="text-base pixelify ml-2 block md:hidden">Sign in</p>
        </button>
    )
}