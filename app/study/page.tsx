"use client";

import { useEffect, useState } from "react";

async function getData() {
    const res = await fetch("../api/language/get-cards");
    if(res.ok){
        return res.json();
    } else {
        return "not logged in"
    }
}

export default function Study() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; // ✅ Prevents state update if unmounted

        getData().then((response) => {
            if (isMounted) {
                setData(response);
                setLoading(false);
                console.log("hit once")
            }
        });

        return () => {
            isMounted = false; // ✅ Cleanup to avoid memory leaks
        };
    }, []); // ✅ Runs only once

    return (
        <div className="w-screen flex pixelify flex-col">
            <div className="mt-[20vh] flex flex-row justify-center mb-[20vh]">
                <div className="relative cursor-pointer card w-40 min-h-20 mx-10 flex justify-center items-center thick-shadow h-fit bg-[#ffffff] border-black border-[1.5px]">
                    <p>View All Cards</p>
                </div>
                <div className="relative cursor-pointer card w-40 mb-[20vh] mx-10  min-h-20 flex justify-center items-center thick-shadow h-fit bg-[#ffffff] border-black border-[1.5px]">
                    <p className="mx-4 text-center">Sort By Language</p>
                </div>
            </div>
        </div>
    );
}