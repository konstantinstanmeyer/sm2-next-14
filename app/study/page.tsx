"use client";

import { useEffect, useState } from "react";

async function getData() {
    const res = await fetch("../api/language/get-cards");
    return res.json();
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
        <div className="w-screen flex flex-col">
            <div className="mt-[20vh]">
                <p onClick={() => console.log(data)}>click</p>
            </div>
        </div>
    );
}