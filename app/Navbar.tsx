"use client"

import SignIn from "./SignIn"; // Importing the SignIn component
import SignOut from "./SignOut"; // Importing the SignOut component
import { useState, useEffect } from "react";

// Server Component for Navbar

// async function getData() {
//     const res = await fetch('/api/random-message');
//     const data: any = await res.json();
//     return data.randomMessage;
// }

export default function Navbar({ session }: any) {
    const [time, setTime] = useState<any>(Date.now());

    // useEffect(()=>{
    //     setInterval(()=>{ let newDate = new Date(); setTime(newDate)}, 1000);
    // },[])

    // simulate server-side fetching of random message
    // const randomMessage = await getData();

    // return the Navbar with the session and random message props
    return (
        <div id="start-bar" className="title-bar-text fixed bottom-0 w-screen mr-0! flex justify-between items-center p-0.5 z-20">
            <button className="px-1 py-1 flex text-sm gap-2 items-center justify-center font-[600]">
                <img src="sm2.png" className="w-[4rem] pb-0.5 h-[1.3rem]" />
            </button>
            {session?.user?.name ? (
                <>
                    {/* <p className="ml-auto hidden sm:block mr-4 text-black font-normal pl-2">Hello, {session.user.name?.split(" ")[0]}</p> */}
                    <p className="ml-auto hidden sm:block mr-4 text-black font-normal pl-2">Hello</p>
                    <div className="flex flex-row items-center justify-center">
                        {/* <a className="text-black mr-2" href="/study">
                            <button>Study</button>
                        </a> */}
                        <SignOut />
                    </div>
                </>
            ) : (
                <SignIn />
            )}
        </div>
    );
}