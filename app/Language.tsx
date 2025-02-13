"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import AddCard from "./AddCard";

function getData(currentLanguage: string): Promise<any> {
    return fetch(`../api/language/${currentLanguage}`)
        .then(r => r.json());
}

export default function Language() {
    // const [languageId, setLanguageId] = useState("indonesian");
    // const [sample, setSample] = useState<string>("");
    // const [isAdding, setIsAdding] = useState<boolean>(false);
    // const { data: session, status } = useSession();
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    
    // const hasFetched = useRef(false); // ✅ Prevents duplicate fetch on mount

    // function enforceLoadingState(newSample: string) {
    //     setIsLoading(true);

    //     setTimeout(() => {
    //         if (newSample) {
    //             setIsLoading(false);
    //         } else {
    //             enforceLoadingState(sample); // Re-check if sample is still empty
    //         }
    //     }, 900);
    // }

    // useEffect(() => {
    //     if (hasFetched.current) return; // ✅ Prevents duplicate fetch on mount
    //     hasFetched.current = true;

    //     setIsLoading(true);
    //     getData(languageId).then(data => {
    //         setSample(data.text);
    //         enforceLoadingState(data.text);
    //     });
    // }, []); // ✅ Runs only once on initial render

    // function getNewSample() {
    //     setIsLoading(true);
    //     getData(languageId).then(data => {
    //         setSample(data.text);
    //         enforceLoadingState(data.text);
    //     });
    // }

    // function getNewLanguage(incomingLanguage:string){
    //     setIsLoading(true);
    //     setLanguageId(incomingLanguage);
    //     getData(incomingLanguage).then(data => {
    //         setSample(data.text);
    //         enforceLoadingState(data.text);
    //     });
    // }

    // return (
    //     <div className="flex flex-col items-center transition-all ease-in">
    //         {!isAdding ? (
    //             <>
    //                 <div className="pixelify mb-2 outline-none">
    //                     <select 
    //                         className="bg-[white] thick-shadow border-black border-[1.5px]" 
    //                         value={languageId} 
    //                         onChange={(e: any) => getNewLanguage(e.target.value)}
    //                     >
    //                         <option>Indonesian</option>
    //                         <option>Italian</option>
    //                         <option>Spanish</option>
    //                         <option>Japanese</option>
    //                         <option>French</option>
    //                     </select>
    //                 </div>

    //                 <div className="relative card w-40 mb-[20vh] min-h-20 flex justify-center items-center thick-shadow h-fit bg-[#ffffff] border-black border-[1.5px]">
    //                     <p className={`pixelify p-4 hyphens-manual rounded-[9px] ${isLoading ? "loading animate-pulse" : ""} break-words`}>
    //                         {sample}
    //                     </p>
    //                     {sample && (
    //                         <div className="absolute bottom-[-30px] w-full flex flex-row items-center justify-center">
    //                             <button onClick={getNewSample} className="flex justify-center">
    //                                 <img className={`w-5 ${isLoading ? "animate-spin" : ""}`} src="redo.png" />
    //                             </button>
    //                             {status === "authenticated" && (
    //                                 <button onClick={() => setIsAdding(true)} className="pixelify ml-2">
    //                                     add card
    //                                 </button>
    //                             )}
    //                         </div>
    //                     )}
    //                 </div>
    //             </>
    //         ) : (
    //             isAdding && session ? (
    //                 <AddCard language={languageId} text={sample} />
    //             ) : null
    //         )}
    //     </div>
    // );

    return (
        <div></div>
    )
}