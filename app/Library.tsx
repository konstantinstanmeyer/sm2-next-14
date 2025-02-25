"use client";

import { CardModel } from "@/models/types/models";
import { useEffect, useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import TableRow from "./TableRow";

interface Response {
    cards: Array<CardModel>;
}

interface CollectionResponse {
    collections: Array<string>;
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
    // console.log("hello")
    // console.log(language + "-" + sampleLength )
    const res = await fetch("../api/language/get-samples/" + language + "-" + sampleLength);
    if(res.ok){
        return res.json();
    } else {
        return "error";
    }
}

async function getCollections(){
    const res = await fetch("../api/user/get-collections");
    if(res.ok) {
        return res.json();
    } else {
        return "error";
    }
}

async function getCollectionCards(collectionName: string){
    const res = await fetch("../api/user/get-collections/" + collectionName);
    if(res.ok) {
        return res.json();
    } else {
        return "error";
    }
}

export default function Library({ setViewingMode, sessionStatus, setAddLanguage, setAddText }: { setViewingMode: Dispatch<SetStateAction<string>>, sessionStatus: string, setAddLanguage: Dispatch<SetStateAction<string | undefined>>, setAddText: Dispatch<SetStateAction<string>> }) {
    const [data, setData] = useState<Array<CardModel>>([]);
    const [sampleData, setSampleData] = useState<Array<string>>([]);
    // const [filteredData, setFilteredData] = useState<Array<CardModel> | null>(null);
    const [loading, setLoading] = useState(true);
    const [studyMode, setStudyMode] = useState("All Cards");
    const [image,setImage] = useState<string | undefined>(undefined);
    const [filter, setFilter] = useState<undefined | string>(undefined);
    const [sampleFilter, setSampleFilter] = useState<undefined | string>(undefined);
    const [previousSampleFilter, setPreviousSampleFilter] = useState<undefined | string>(undefined);
    const [collectionFilter, setCollectionFilter] = useState<undefined | string>(undefined);
    const [previousCollectionFilter, setPreviousCollectionFilter] = useState<undefined | string>(undefined);
    const [sampleLength, setSampleLength] = useState<string>("20");
    const [previousSampleLength, setPreviousSampleLength] = useState<string>("0");
    const [collectionsList, setCollectionsList] = useState<Array<string>>([]);
    const [viewCard, setViewCard] = useState<any>({});

    useEffect(() => {
        let isMounted = true;

        getData().then((response: Response) => {
            if (isMounted) {
                setData(response.cards);
                getCollections().then((r:CollectionResponse) => {
                    setCollectionsList(r.collections);
                    setLoading(false);
                })
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
            if(collectionFilter){
                return;
            }
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

    useEffect(() => {
        console.log("entered")
        if(collectionFilter){
            console.log("entered 2")
            setLoading(true);
            setPreviousCollectionFilter(collectionFilter);
            getCollectionCards(collectionFilter)
            .then(res => {
                setData(res.cards);
                setLoading(false);
            })
        } else if(!collectionFilter && previousCollectionFilter){
            console.log("entered 3")
            setLoading(true);
            getData().then((response: Response) => {
                console.log(response.cards)
                setData(response.cards);
                setLoading(false);
            });
        }
    },[collectionFilter])

    const filteredData = data.filter(c => filter === undefined || c.language === filter);

    function handleImageClick(image: undefined | string){
        if(image) setImage(image);
    }

    console.log(sampleFilter)

    function handleFilterChange(language: string | undefined){
        if(studyMode === "All Cards"){
            if(filter !== language && language !== undefined) {
                setFilter(language);
            } else {
                setFilter(undefined);
            }
        } else {
            console.log("heoijaf")
            setSampleData([]);
            if(sampleFilter !== language) {
                setSampleFilter(undefined)
                setLoading(true);
            } else {
                setSampleFilter(undefined);
                setSampleData([]);
            }
        }
    }

    function handleAddCard(incomingLanguage: string | undefined, incomingText: string){
        if(incomingLanguage){
            setAddLanguage(incomingLanguage);
            setAddText(incomingText);
            setViewingMode("Add");
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
                    {/* <div className="flex md:flex-row flex-row items-center md:items-center">
                        <div className="flex items-center justify-center md:flex-row flex-col mr-0 md:mr-4"> */}
                    <div className="flex md:flex-row flex-row items-center md:items-center">
                        <div className="flex items-center justify-center md:flex-row flex-col mr-0 md:mr-4">  
                            <p className="md:block hidden mr-0 md:mr-2">Language:</p>
                            <p className="block md:hidden md:text-base text-[0.6rem] md:mb-0 -mb-1 mr-0 md:mr-2">Lang.:</p>
                            <select value={filter} className="md:scale-100 scale-[80%] md:w-fit w-16" onChange={(e: ChangeEvent<HTMLSelectElement>) => handleFilterChange(e.target.value === "All" ? undefined : e.target.value)}>
                                <option>All</option>
                                <option>Spanish</option>
                                <option>Japanese</option>
                                <option>Indonesian</option>
                                <option>Italian</option>
                                <option>French</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-center md:flex-row flex-col mr-0 md:mr-4">  
                            <p className="md:block hidden mr-0 md:mr-2">Collection:</p>
                            <p className="block md:hidden md:text-base text-[0.6rem] md:mb-0 -mb-1 mr-0 md:mr-2">Col.:</p>
                            <select value={collectionFilter} className="md:scale-100 scale-[80%] md:w-fit w-14" onChange={(e: ChangeEvent<HTMLSelectElement>) => setCollectionFilter(e.target.value === "Select" ? undefined : e.target.value)}>
                                <option>Select</option>
                                {collectionsList.map((collectionName, i) => {
                                    return <option key={"collection-" + i}>{collectionName}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="window" role="tabpanel">
                    <div className="window-body relative">
                        <div className="sunken-panel table-height w-full relative">
                            <table className="interactive w-full relative">
                                <thead className="relative">
                                <tr className="relative">
                                    <th className="w-1/6">Language</th>
                                    {!loading ? (
                                    <>
                                        <th className="w-2/6">Original</th>
                                        <th className="w-2/6">Translation</th>
                                        <th className="w-1/6">All Info</th>
                                        {/* <th className="w-14">Phonetic</th>
                                        <th className="w-14">Context</th>
                                        <th className="w-[4.6rem]">Image</th> */}
                                    </>
                                    ) :null}
                                </tr>
                                </thead>
                                <tbody className="w-10">
                                {loading ? <LoadingRows /> : filteredData && filteredData.length <= 0 ? 
                                <tr className="highlight">
                                    <td className="">You have 0 saved cards</td>
                                    <td className=""></td>
                                </tr> :
                                (filteredData && filteredData.map((card, i) => (
                                    <TableRow card={card} index={i} setViewCard={setViewCard} />
                                )))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {viewCard?.original ? 
                    <div className={`abs-centered window w-52`}>
                        <div className="title-bar">
                            <div className="title-bar-text">Card Info</div>
                            <div className="title-bar-controls">
                            <button onClick={() => setViewCard({})} aria-label="Close"></button>
                            </div>
                        </div>
                        <div className="window-body flex flex-col items-center">
                            <p className="font-bold">Original</p>
                            <p className="text-center">{viewCard?.original}</p>
                            <p className="font-bold">Translation</p>
                            <p className="text-center">{viewCard?.translation}</p>
                            {viewCard?.context ? 
                                <>
                                    <p className="font-bold">Context</p>
                                    <p className="text-center">{viewCard?.context}</p>
                                </> : null
                            }
                            {viewCard?.phonetic ? 
                                <>
                                    <p className="font-bold">Phonetic</p>
                                    <p className="text-center">{viewCard?.phonetic}</p>
                                </> : null
                            }
                            {viewCard?.image ? 
                                <>
                                    {image ? <><img className="w-1/2 my-2" src={image} /><button className="min-w-10" onClick={() => setImage(undefined)}>close</button></> : <button className="mt-2" onClick={() => setImage(viewCard.image)}>View Image</button>}
                                </> : null
                            }
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
                            <select value={sampleFilter || "Select"} className="md:scale-100 scale-[80%] w-16  md:w-fit" onChange={(e: ChangeEvent<HTMLSelectElement>) => setSampleFilter(e.target.value === "Select" ? undefined : e.target.value)}>
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
                        <div className="sunken-panel table-height w-full relative">
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
                                        <td onClick={() => handleAddCard(sampleFilter, sample)} className="h-fit">add</td>
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