"use client";

import { CardModel } from "@/models/types/models";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

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

async function getSamples(language: string){
    const res = await fetch("../api/language/get-samples/" + language);
    if(res.ok){
        return res.json();
    } else {
        return "error";
    }
}

export default function Library({ setViewingMode, sessionStatus }: { setViewingMode: Dispatch<SetStateAction<string>>, sessionStatus: string}) {
    const [data, setData] = useState<Array<CardModel>>([]);
    const [sampleData, setSampleData] = useState<Array<CardModel>>([]);
    // const [filteredData, setFilteredData] = useState<Array<CardModel> | null>(null);
    const [loading, setLoading] = useState(true);
    const [studyMode, setStudyMode] = useState("All Cards");
    const [image,setImage] = useState<string | undefined>(undefined);
    const [filter, setFilter] = useState<undefined | string>(undefined);
    const [sampleFilter, setSampleFilter] = useState<undefined | string>(undefined);

    useEffect(() => {
        let isMounted = true;

        getData().then((response: Response) => {
            if (isMounted) {
                setData(response.cards);
                setLoading(false);
                console.log(data);
            }
        });

        return () => {
            isMounted = false; // preventing memory leaks
        };
    }, []);

    useEffect(() => {
        if(studyMode === "View Samples" && sampleFilter){
            console.log("here")
            getSamples(sampleFilter)
            .then(res => {
                console.log(res)
                setSampleData(res.samples)
                setLoading(false);
            })
        } else {
            let isMounted = true;

            getData().then((response: Response) => {
                if (isMounted) {
                    setData(response.cards);
                    setLoading(false);
                    console.log(data);
                }
            });

            return () => {
                isMounted = false; // preventing memory leaks
            };
        }
    }, [studyMode, sampleFilter])

    const filteredData = data.filter(c => filter === undefined || c.language === filter);

    function handleImageClick(image: undefined | string){
        if(image) setImage(image);
    }

    function handleCheckboxClick(language: string){
        if(studyMode === "All Cards"){
            if(filter !== language) {
                setFilter(language);
            } else {
                setFilter(undefined);
            }
        } else {
            setSampleData([]);
            if(sampleFilter !== language) {
                setSampleFilter(language)
                setLoading(true);
            } else {
                setSampleFilter(undefined);
                setSampleData([]);
            }
        }
    }

    console.log(sampleData);

    return (
        <div className={`window w-[80vw] relative z-10`}>
            <p className="">Library</p>
            <div className="title-bar-controls absolute top-1 right-1">
                <button onClick={() => setViewingMode("")} aria-label="Close"></button>
            </div>
            <menu role="tablist">
                <li className="cursor-pointer" role="tab" onClick={() => setStudyMode("All Cards")} aria-selected={studyMode === "All Cards"}><a>All Cards</a></li>
                <li className="cursor-pointer" role="tab" onClick={() => setStudyMode("View Samples")} aria-selected={studyMode === "View Samples"}><a>View Samples</a></li>
            </menu>
            {studyMode === "All Cards" ? 
            <>
                <div className="absolute top-6 left-36">
                    <div className="flex flex-wrap justify-center items-center">
                        <p className="mr-2">Languages:</p>
                        <div className="field-row p-0 mx-2">
                            <input checked={filter === "Spanish"} onChange={() => handleCheckboxClick("Spanish")} type="checkbox" id="example2"/>
                            <label htmlFor="example2">Spanish</label>
                        </div>
                        <div className="field-row !mt-0 p-0 mx-2">
                            <input checked={filter === "Japanese"} onChange={() => handleCheckboxClick("Japanese")} type="checkbox" id="example3"/>
                            <label htmlFor="example3">Japanese</label>
                        </div>
                        <div className="field-row !mt-0 mx-2 p-0">
                            <input checked={filter === "Indonesian"} onChange={() => handleCheckboxClick("Indonesian")} type="checkbox" id="example4"/>
                            <label htmlFor="example4">Indonesian</label>
                        </div>
                        <div className="field-row !mt-0 mx-2 p-0">
                            <input checked={filter === "Italian"} onChange={() => handleCheckboxClick("Italian")} type="checkbox" id="example5"/>
                            <label htmlFor="example5">Italian</label>
                        </div>
                    </div>
                </div>
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
                                {loading ? <LoadingRows /> : 
                                (filteredData && filteredData.map((card, i) => (
                                    <tr id={"data-row" + i} className="">
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
                    <div className="status-bar">
                        <p className="status-bar-field">Press F1 for help</p>
                        <p className="status-bar-field">Slide 1</p>
                        <p className="status-bar-field">CPU Usage: 14%</p>
                    </div>
                </div>
            </> : 
            <>
                 <div className="absolute top-6 left-36">
                    <div className="flex flex-wrap justify-center items-center">
                        <p className="mr-2">Languages:</p>
                        <div className="field-row p-0 mx-2">
                            <input checked={sampleFilter === "Spanish"} onChange={() => handleCheckboxClick("Spanish")} type="checkbox" id="example6"/>
                            <label htmlFor="example6">Spanish</label>
                        </div>
                        <div className="field-row !mt-0 p-0 mx-2">
                            <input checked={sampleFilter === "Japanese"} onChange={() => handleCheckboxClick("Japanese")} type="checkbox" id="example7"/>
                            <label htmlFor="example7">Japanese</label>
                        </div>
                        <div className="field-row !mt-0 mx-2 p-0">
                            <input checked={sampleFilter === "Indonesian"} onChange={() => handleCheckboxClick("Indonesian")} type="checkbox" id="example8"/>
                            <label htmlFor="example8">Indonesian</label>
                        </div>
                        <div className="field-row !mt-0 mx-2 p-0">
                            <input checked={sampleFilter === "Italian"} onChange={() => handleCheckboxClick("Italian")} type="checkbox" id="example9"/>
                            <label htmlFor="example9">Italian</label>
                        </div>
                    </div>
                </div>
                <div className="window" role="tabpanel">
                    <div className="window-body relative">
                        <div className="sunken-panel h-[200px] w-full relative">
                            <table className="interactive w-full relative">
                                <thead className="relative">
                                <tr className="relative">
                                    {!loading ? (
                                    <>
                                        <th className="">Samples</th>
                                        <th className="">Action</th>
                                    </>
                                    ) :null}
                                </tr>
                                </thead>
                                <tbody className="w-10">
                                {loading ? <LoadingRows /> : 
                                (sampleData && sampleData.map((sample, i) => (
                                    <tr id={"sample-row" + i} className="">
                                        <td className="!w-10">({i + 1}) &nbsp; {sample}</td>
                                        <td className="!w-10">click to save</td>
                                    </tr>
                                )))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="status-bar">
                        <p className="status-bar-field">Press F1 for help</p>
                        <p className="status-bar-field">Slide 1</p>
                        <p className="status-bar-field">CPU Usage: 17%</p>
                    </div>
                </div>
            </>
            }
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