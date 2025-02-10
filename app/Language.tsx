"use client"

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react"
import AddCard from "./AddCard";

function getData(currentLanguage: string): Promise<any>{
    return fetch("../api/language/" + currentLanguage)
    .then(r => r.json());
}

export default function Language(){
    const [languageId, setLanguageId] = useState("indonesian");
    const [sample, setSample] = useState<string>("");
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const isFirstRender = useRef(true);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // Prevent initial double fetch
        }
        
        getData(languageId)
        .then(data => {
            console.log(data);
            setSample(emptyString => data.text);
        })
    }, [languageId])

    function getNewSample(){
        getData(languageId)
        .then(data => {
            console.log(data);
            setSample(emptyString => data.text);
        })
    }

    return (
        <div className="flex flex-col items-center transition-all ease-in">
            {!isAdding ? (
                <>
                <div className="pixelify mb-2 outline-none">
                <select className="bg-[white] thick-shadow border-black border-[1.5px]" value={languageId} onChange={(e: any) => setLanguageId
            (e.target.value)}>
                    <option>Indonesian</option>
                    <option>Italian</option>
                    <option>Spanish</option>
                    <option>Japanese</option>
                    <option>French</option>
                </select>
            </div>
            <div className="relative card w-40 thick-shadow h-fit bg-[#ffffff] border-black border-[1.5px]">
                <p className="pixelify p-4 hyphens-manual break-words">{sample}</p>
                {!sample ? null : 
                <div className="absolute bottom-[-30px] w-full flex flex-row items-center justify-center">
                    <button onClick={() => getNewSample()} className='flex justify-center'>
                        <img className="w-5" src="redo.png" />
                    </button>
                    {status === "authenticated" ? (<button onClick={isAdding => setIsAdding(true)} className="pixelify ml-2">
                        add card
                    </button>): null}
                </div>
                }
                </div>
                </>
            )
            : isAdding && session ? (<AddCard setIsAdding={setIsAdding} language={languageId} text={sample} />) : null
            }
        </div>
    )
}