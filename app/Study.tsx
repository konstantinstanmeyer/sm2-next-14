"use client";

import { CardModel } from "@/models/types/models";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
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

export default function Study({ setViewingMode }: { setViewingMode: Dispatch<SetStateAction<string>>}) {
    const [data, setData] = useState<Array<CardModel> | null>(null);
    const [loading, setLoading] = useState(true);
    const [studyMode, setStudyMode] = useState("All Cards");
    const [image,setImage] = useState<string | undefined>(undefined);

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

    function handleImageClick(image: undefined | string){
        if(image) setImage(image);
    }

    return (
        <div className="window w-[80vw] relative">
            <p className="">Study</p>
            <div className="title-bar-controls absolute top-1 right-1">
                <button onClick={() => setViewingMode("")} aria-label="Close"></button>
                </div>
                
            <menu role="tablist">
                <li className="cursor-pointer" role="tab" onClick={() => setStudyMode("All Cards")} aria-selected={studyMode === "All Cards"}><a>All Cards</a></li>
                <li className="cursor-pointer" role="tab" onClick={() => setStudyMode("Language")} aria-selected={studyMode === "Language"}><a>Filter By Language</a></li>
            </menu>
            <div className="window" role="tabpanel">
                <div className="window-body relative">
                <div className="sunken-panel h-[200px] w-full relative">
                    <table className="interactive w-full relative">
                        <thead className="relative">
                        <tr className="relative">
                            <th className="">Language</th>
                            {!loading ? (
                                <>
                            <th className="">Original</th>
                            <th className="">Translation</th>
                            <th className="">Phonetic</th>
                            <th className="">Context</th>
                            <th className="">Image</th>
                            </>
                            ) :null}
                        </tr>
                        </thead>
                        <tbody className="w-10">
                        {loading ? 
                        (
                            <LoadingRows />
                        ): 
                        (data && data.map((card, i) => (
                            <tr className="">
                                <td className="!w-10">{card.language}</td>
                                <td className="!w-10">{card.original.length > 40 ? card.original.slice(0,30) + "..." : card.original}</td>
                                <td className="!w-10">{card.translation.length > 40 ? card.translation.slice(0,30) + "..." : card.translation}</td>
                                <td className="!w-10">{!card?.phonetic ? "None" : card?.phonetic?.length > 15 ? card.phonetic.slice(0,15) + "..." : card.phonetic}</td>
                                <td className="!w-10">{!card?.context ? "None" : card?.context?.length > 15 ? card.context.slice(0,15) + "..." : card.phonetic}</td>
                                <td onClick={() => handleImageClick(card?.image)} className="!w-10">{card?.image ? "Click to View" : "None"}</td>
                            </tr>
                        )))
                        }
                        </tbody>
                    </table>
                    </div>
                </div>
                {image ? 
                <div className={`abs-centered window`}>
                    <div className="title-bar">
                        <div className="title-bar-text">Image Preview</div>
                        <div className="title-bar-controls">
                        <button onClick={() => setImage(undefined)} aria-label="Close"></button>
                        </div>
                    </div>
                    <div className="window-body">
                        <img src={image} />
                    </div>
                </div> : null}
            </div>
                {/* {viewingMode === "Selection" ? 
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
                }  */}
        </div>
    );
}

function LoadingRows(){
    return (
        <>
            <tr className="w-full">
                <td className="w-1/6">Loading...</td>
            </tr>
            <tr className="w-full">
                <td className="w-1/6">Loading...</td>
            </tr>
            <tr className="w-full">
                <td className="w-1/6">Loading...</td>
            </tr>
            <tr className="w-full">
                <td className="w-1/6">Loading...</td>
            </tr>
            <tr className="w-full">
                <td className="w-1/6">Loading...</td>
            </tr>
            <tr className="w-full">
                <td className="w-1/6">Loading...</td>
            </tr>
            <tr className="w-full">
                <td className="w-1/6">Loading...</td>
            </tr>
            <tr className="w-full">
                <td className="w-1/6">Loading...</td>
            </tr>
        </>
    )
}