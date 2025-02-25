"use client"

import { Dispatch, SetStateAction, useState, useEffect } from "react"

interface Props {
    setViewingMode: Dispatch<SetStateAction<string>>;
}

async function getCollections(){
    const res = await fetch("../api/user/get-collections");
    if(res.ok) {
        return res.json();
    } else {
        return "error";
    }
}

async function getQuizCards(quizInfo: { language: string | undefined, collectionName: string | undefined, sandbox: boolean }){
    console.log(quizInfo);
    const res = await fetch("../api/language/quiz", {
        method: "POST",
        headers: {
            contentType: "application/json"
        },
        body: JSON.stringify(quizInfo)
    })
    if(res.ok){
        return res.json();
    } else {
        return "error";
    }
}

export default function Quiz({ setViewingMode }: Props){
    // const [quizMode, setQuizMode] = useState<string | undefined>(undefined);
    const [collectionName, setCollectionName] = useState<string | undefined>(undefined);
    const [collectionArray, setCollectionArray] = useState<Array<string>>([]);
    const [allCollections, setAllCollections] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [language, setLanguage] = useState<string | undefined>(undefined);
    const [sandbox, setSandbox] = useState<boolean>(false);
    const [cards, setCards] = useState<Array<any>>([]);
    const [cardIndex, setCardIndex] = useState<number>(0);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        let isMounted = true;

        if(isMounted){
            setLoading(true);
            getCollections()
            .then(res => {
                setCollectionArray(res.collections)
                setLoading(false);
            });
        }

        return () => {
            isMounted = false; // preventing memory leaks
        };
    }, []);

    function handleStartQuiz(){
        setLoading(true);
        getQuizCards({ language: language, collectionName: language ? undefined : collectionName, sandbox: sandbox })
        .then(res => {
            if(res?.cards?.length >= 1){
                setCards(res.cards);
            } else {
                setError("No cards found");
            }
            setLoading(false);
        });
    }

    function handleEval(cardId: string, score: number){
        if(sandbox){
            return
        } else {
            // setLoading(true);
            fetch("../api/language/quiz/update-card", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cardId: cardId, score: score})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setLoading(false)
            })
        }
    }

    return(
        <div className="window w-64 h-80 flex flex-col items-center relative">
            <div className="title-bar w-full">
                <div className="title-bar-text">Quiz</div>
                <div className="title-bar-controls">
                    <button onClick={(e: any) => setViewingMode("")} aria-label="Close"/>
                </div>
            </div>
            {cards.length > 0 ? 
            <> 
                <button onClick={() => {setCards([]); setCardIndex(0)}}>Cancel</button>
                <div className="w-full relative">
                    <p>Original</p>
                    <p>{cards[cardIndex].original}</p>
                    <p>Translation</p>
                    <p>{cards[cardIndex].translation}</p>
                    {sandbox ? null : <div className="flex flex-row w-full items-center justify-center">
                        <button onClick={() => handleEval(cards[cardIndex]._id, 1)} className="!w-10">1</button>
                        <button onClick={() => handleEval(cards[cardIndex]._id, 2)} className="!w-10">2</button>
                        <button onClick={() => handleEval(cards[cardIndex]._id, 3)} className="!w-10">3</button>
                        <button onClick={() => handleEval(cards[cardIndex]._id, 4)} className="!w-10">4</button>
                        <button onClick={() => handleEval(cards[cardIndex]._id, 5)} className="!w-10">5</button>
                    </div>}
                    <button onClick={() => setCardIndex(cardIndex - 1)} disabled={cardIndex === 0}>Back</button>
                    <button onClick={() => setCardIndex(cardIndex + 1)} disabled={cardIndex === cards.length - 1}>Next</button>
                </div>
            </> :
            <>
                <div className="flex flex-col items-center mt-4">
                    <p className="font-bold mb-2">Setup</p>
                    <p className="mb-1">Collection: </p>
                    <select disabled={allCollections || loading ? true : false} value={collectionName || undefined} onChange={(e) => e.target.value === "Select" ? setCollectionName(undefined) : setCollectionName(e.target.value)} className="w-20 mb-2">
                        {loading ? <option>Loading...</option> : <option>Select</option>}
                        {collectionArray.map((collection: string, i: number) => {
                            return <option key={"colletion-name" + i}>{collection}</option>
                        })}
                    </select>
                    <input
                        className="" 
                        checked={allCollections} 
                        onChange={() => setAllCollections(prev => !prev)}
                        type="checkbox" 
                        id="all-collections">
                    </input>
                    <label htmlFor="all-collections">Use all collections</label>
                    {allCollections ? 
                    (
                        <>
                            <p className="my-2">Select a Language</p>
                            <select disabled={allCollections ? false : true} value={language || undefined} onChange={e => e.target.value === "Select" ? setLanguage(undefined) : setLanguage(e.target.value)} className="w-20">
                            {loading ? <option>Loading...</option> : 
                            <>
                                <option>Select</option>
                                <option>Spanish</option>
                                <option>Japanese</option>
                                <option>Indonesian</option>
                                <option>Italian</option>
                                <option>French</option>
                            </>
                            }
                            </select>
                        </>
                    ) : null
                    }
                    {collectionName && !allCollections || language ? 
                    <>
                        <input onChange={() => setSandbox(sandbox => !sandbox)} checked={sandbox} className="" type="checkbox" id="set-sandbox"></input>
                        <label className="mt-2" htmlFor="set-sandbox">Sandbox Mode</label>
                    </> : null}
                    {collectionName && !allCollections || language ?
                    <button onClick={() => handleStartQuiz()} className="mt-3">Start</button>:null
                    }
                    {error ? <p>{error}</p> : null}
                </div>
            </>
            }
        </div>
    )
}