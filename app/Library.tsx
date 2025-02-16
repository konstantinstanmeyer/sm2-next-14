"use client";

import { CardModel } from "@/models/types/models";
import { useEffect, useState, Dispatch, SetStateAction, ChangeEvent } from "react";

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

async function getSamples(language: string, sampleLength: string){
    console.log("hello")
    console.log(language + "-" + sampleLength )
    const res = await fetch("../api/language/get-samples/" + language + "-" + sampleLength);
    if(res.ok){
        return res.json();
    } else {
        return "error";
    }
}

export default function Library({ setViewingMode, sessionStatus }: { setViewingMode: Dispatch<SetStateAction<string>>, sessionStatus: string}) {
    const [data, setData] = useState<Array<CardModel>>([]);
    const [sampleData, setSampleData] = useState<Array<string>>([]);
    // const [filteredData, setFilteredData] = useState<Array<CardModel> | null>(null);
    const [loading, setLoading] = useState(true);
    const [studyMode, setStudyMode] = useState("All Cards");
    const [image,setImage] = useState<string | undefined>(undefined);
    const [filter, setFilter] = useState<undefined | string>(undefined);
    const [sampleFilter, setSampleFilter] = useState<undefined | string>(undefined);
    const [previousSampleFilter, setPreviousSampleFilter] = useState<undefined | string>(undefined);
    const [sampleLength, setSampleLength] = useState<string>("20");
    const [previousSampleLength, setPreviousSampleLength] = useState<string>("0");

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
        if(sampleFilter === undefined){
            setSampleData([]);
            return;
        }

        if(studyMode === "View Samples" && sampleFilter){
            if(sampleData?.length >= 1 && previousSampleLength === sampleLength && previousSampleFilter === sampleFilter){
                return; // maintain the state if there are already sample to not disrupt UX
            }
            setPreviousSampleFilter(sampleFilter);
            setPreviousSampleLength(sampleLength);
            setSampleData([]);
            setLoading(true);
            getSamples(sampleFilter, sampleLength)
            .then(res => {
                setSampleData(res.samples)
                setLoading(false);
            })
        } else {
            let isMounted = true;

            getData().then((response: Response) => {
                if (isMounted) {
                    setData(response.cards);
                    setLoading(false);
                }
            });

            return () => {
                isMounted = false; // preventing memory leaks
            };
        }
    }, [studyMode, sampleFilter, sampleLength])

    const filteredData = data.filter(c => filter === undefined || c.language === filter);

    function handleImageClick(image: undefined | string){
        if(image) setImage(image);
    }

    function handleFilterChange(language: string | undefined){
        if(studyMode === "All Cards"){
            if(filter !== language && language !== undefined) {
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
                <div className="absolute top-3 md:top-5 right-5 md:right-auto md:left-36">
                    <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center">
                        <p className="md:block hidden mr-0 md:mr-2">Language:</p>
                        <p className="block md:hidden md:text-base text-[0.6rem] md:mb-0 -mb-1 mr-0 md:mr-2">Lang.:</p>
                        <select value={filter} className="md:scale-100 scale-[80%] md:w-fit w-14" onChange={(e: ChangeEvent<HTMLSelectElement>) => handleFilterChange(e.target.value === "All" ? undefined : e.target.value)}>
                            <option>All</option>
                            <option>Spanish</option>
                            <option>Japanese</option>
                            <option>Indonesian</option>
                            <option>Italian</option>
                            <option>French</option>
                        </select>
                    </div>
                </div>
                <div className="window" role="tabpanel">
                    <div className="window-body relative">
                        <div className="sunken-panel h-[200px] w-full relative">
                            <table className="interactive w-full relative">
                                <thead className="relative">
                                <tr className="relative">
                                    <th className="w-16">Language</th>
                                    {!loading ? (
                                    <>
                                        <th className="w-32">Original</th>
                                        <th className="w-32">Translation</th>
                                        <th className="w-14">Phonetic</th>
                                        <th className="w-14">Context</th>
                                        <th className="w-[4.6rem]">Image</th>
                                    </>
                                    ) :null}
                                </tr>
                                </thead>
                                <tbody className="w-10">
                                {loading ? <LoadingRows /> : 
                                (filteredData && filteredData.map((card, i) => (
                                    <tr key={"data-row" + i} className="highlight">
                                        <td className="">{card.language}</td>
                                        <td className="">{card.original}</td>
                                        <td className="">{card.translation}</td>
                                        <td className="">{!card?.phonetic ? "None" : card?.phonetic}</td>
                                        <td className="">{!card?.context ? "None" : card?.context}</td>
                                        <td onClick={() => handleImageClick(card?.image)} className="">{card?.image ? "Click to View" : "None"}</td>
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
                 <div className="absolute top-3 md:top-5 right-5 md:right-auto md:left-36">
                    <div className="flex md:flex-row flex-row items-center md:items-center">
                        <div className="flex items-center justify-center md:flex-row flex-col mr-0 md:mr-4">
                            <p className="md:block hidden mr-0 md:mr-2">Language:</p>
                            <p className="block md:hidden md:text-base text-[0.6rem] md:mb-0 -mb-1 mr-0 md:mr-2">Lang.</p>
                            <select value={sampleFilter} className="md:scale-100 scale-[80%] w-16  md:w-20" onChange={(e: ChangeEvent<HTMLSelectElement>) => setSampleFilter(e.target.value === "Select" ? undefined : e.target.value)}>
                                <option>Select</option>
                                <option>Spanish</option>
                                <option>Japanese</option>
                                <option>Indonesian</option>
                                <option>Italian</option>
                                <option>French</option>
                            </select>
                        </div>
                        {/* <div className="field-row p-0 mx-2">
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
                        </div> */}
                        <div className="flex md:flex-row flex-col justify-center items-center">
                            <p className="md:block hidden mr-0 md:mr-2"># of samples:&nbsp;</p>
                            <p className="block md:hidden md:text-base text-[0.6rem] md:mb-0 -mb-1 mr-0 md:mr-2">Amount</p>
                            <select value={sampleLength} className="md:w-auto w-14 md:scale-100 scale-[80%]" onChange={(e: ChangeEvent<HTMLSelectElement>) => setSampleLength(e.target.value)}>
                                <option>20</option>
                                <option>40</option>
                                <option>60</option>
                                <option>80</option>
                                <option>100</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="window" role="tabpanel">
                    <div className="window-body relative">
                        <div className="sunken-panel h-[200px] w-full relative">
                            <table className="interactive w-full relative">
                                <thead className="relative w-full">
                                <tr className="relative w-full">
                                    {!loading ? (
                                    <>
                                        <th className="!w-5/6">Samples</th>
                                        {sampleData.length >= 1 ? <th className="!w-20">Action</th> : null}
                                    </>
                                    ) : <th className="!w-1/6">Samples</th>}
                                </tr>
                                </thead>
                                <tbody className="">
                                {loading ? <LoadingRows /> : 
                                (sampleData.length >= 1 ? sampleData.map((sample, i) => (
                                    <tr id={"sample-row" + i} className="highlight">
                                        <td className="h-fit">({i + 1}) &nbsp; {sample}</td>
                                        <td className="h-fit">add</td>
                                    </tr>
                                )) : <tr id={"sample-row"} className="">
                                <td className="!w-10">please select a language</td>
                            </tr>)
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