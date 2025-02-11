"use client";

import { CardModel } from "@/models/types/models";
import { useEffect, useState } from "react";
import SmallCard from "./SmallCard"

interface Response {
    cards: Array<CardModel>;
}

async function getData() {
    const res = await fetch("../api/language/get-cards");
    if(res.ok){
        return res.json();
    } else {
        return "not logged in"
    }
}

export default function Study() {
    const [data, setData] = useState<Array<CardModel> | null>(null);
    const [loading, setLoading] = useState(true);
    const [viewingMode, setViewingMode] = useState("Selection")

    useEffect(() => {
        let isMounted = true; // ✅ Prevents state update if unmounted

        getData().then((response: Response) => {
            if (isMounted) {
                setData(response.cards);
                setLoading(false);
                console.log(data)
            }
        });

        return () => {
            isMounted = false; // ✅ Cleanup to avoid memory leaks
        };
    }, []); // ✅ Runs only once

    return (
        <div className="w-screen flex pixelify flex-col">
            <div className="mt-[20vh] flex justify-center mb-[20vh]">
                {viewingMode === "Selection" ? 
                (
                <>
                    <div onClick={() => setViewingMode("All Cards")} className="relative cursor-pointer card w-40 min-h-20 mx-10 flex justify-center items-center thick-shadow h-fit bg-[#ffffff] border-black border-[1.5px]">
                        <p>View All Cards</p>
                    </div>
                    <div onClick={() => setViewingMode("Sort By Language")} className="relative cursor-pointer card w-40 mb-[20vh] mx-10  min-h-20 flex justify-center items-center thick-shadow h-fit bg-[#ffffff] border-black border-[1.5px]">
                        <p className="mx-4 text-center">Sort By Language</p>
                    </div>
                </>
                )
                : viewingMode === "All Cards" ?
                (
                <div className="flex flex-col items-center">
                    <p className="text-2xl">All Cards</p>
                    <div className="mt-8 flex justify-center flex-wrap mx-[10vw]">
                        {data && data.map((card, i) => <SmallCard card={card} />)}
                    </div>
                </div>
                )
                : viewingMode === "Sort By Language" ?
                (
                <>
                    <div>

                    </div>
                </>
                ) : null
                } 
            </div>
        </div>
    );
}