"use client"

import { useState, useEffect } from "react"

function getData(currentLanguage: string): Promise<any>{
    return fetch("../api/language/" + currentLanguage)
    .then(r => r.json());
}

export default function Language(){
    const [languageId, setLanguageId] = useState("in");
    const [sample, setSample] = useState<undefined | string>(undefined);

    useEffect(() => {
        getData(languageId)
        .then(data => {
            console.log(data);
            setSample(emptyString => data.text);
        })
        console.log(sample);
        console.log("hello");
    }, [languageId])

    function getNewSample(){
        getData(languageId)
        .then(data => {
            console.log(data);
            setSample(emptyString => data.text);
        })
    }

    return (
        <div className="flex flex-col items-center justify-center transition-all ease-in">
            <div className="pixelify mb-2 outline-none">
                <select className="bg-[#ffe8ce] border-black border-[1.5px]" onChange={(e: any) => setLanguageId
            (e.target.value)}>
                    <option>in</option>
                    <option>it</option>
                    <option>es</option>
                </select>
            </div>
            <div className="relative card w-40 h-fit bg-[#ffe8ce] border-black border-[1.5px]">
                <p className="pixelify p-4 hyphens-manual break-words">{sample}</p>
                <button onClick={() => getNewSample()} className='absolute bottom-[-30px] w-full flex justify-center'>
                    <img className="w-5" src="redo.png" />
                </button>
            </div>
        </div>
    )
}