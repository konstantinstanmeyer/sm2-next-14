"use client"

import { CollectionModel } from "@/models/types/models";
import { Dispatch, SetStateAction, useState, FormEvent, useRef, useEffect, ChangeEvent } from "react";
import PixelCanvas from "./PixelCanvas";

interface Props {
    language: string;
    text: string;
    setViewingMode: Dispatch<SetStateAction<string>>,
    sessionStatus: string;
}

async function getCollections(){
    const res = await fetch("../api/user/get-collections");
    if(res.ok) {
        return res.json();
    } else {
        return "error";
    }
}

export default function AddCard({ language, text, setViewingMode, sessionStatus }: Props){
    const [languageId, setLanguageId] = useState<string>(language);
    const [originalText, setOriginalText] =  useState<string>(text);
    const [addDrawing, setAddDrawing] = useState<boolean>(false);
    const [incomingCollection, setIncomingCollection] = useState<string | undefined>(undefined);
    const [newCollection, setNewCollection] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [collectionLoading, setCollectionLoading] = useState<boolean>(true);
    const [collectionsList, setCollectionsList] = useState<Array<string>>([]);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        let isMounted = true;

        getCollections().then((response: any) => {
            if (isMounted) {
                setCollectionsList(response.collections);
                setCollectionLoading(false);
            }
        });


        return () => {
            isMounted = false; // preventing memory leaks
        };
    }, [])

    function getString(): Promise<string> {
        return new Promise((resolve, reject) => {
            const canvas = document.getElementById("drawing-board") as HTMLCanvasElement | null;
            
            if (!canvas) {
                reject('Canvas not found');
                return;
            }
    
            const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    
            if (context) {
                // Delay the canvas data extraction if necessary, like waiting for async operations on canvas rendering
                const newImageUrl = context.canvas.toDataURL("image/gif", 50);
                console.log(newImageUrl);
                resolve(newImageUrl); // Resolve the promise with the image URL
            } else {
                reject('Canvas context not available');
            }
        });
    }

    // function testServer(){
    //     fetch("../api/language/save-card", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({

    //         })
    //     }).then(r =>r.json());
    // }

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if((( formData?.get("translation")) as string)?.length >= 1 && (formData?.get("original") as string)?.length >= 1 && languageId){
            const card: any = {
                language: languageId,
                original: formData.get("original"),
                translation: formData.get("translation"),
            }
    
            if(addDrawing){
                getString().then((drawing) => {
                    card.image = drawing;
                    ((formData?.get("phonetic")) as string).length >= 1 ? card.phonetic = formData.get("phonetic") : null;
                    ((formData?.get("context")) as string).length >= 1 ? card.context = formData.get("context") : null;
                    incomingCollection && incomingCollection?.length >= 1 ? card.collection = incomingCollection : null;
                    // console.log("addDrawing");
                    postCard(card);
                })
            } else {
                ((formData?.get("phonetic")) as string).length >= 1 ? card.phonetic = formData.get("phonetic") : null;
                ((formData?.get("context")) as string).length >= 1 ? card.context = formData.get("context") : null;
                incomingCollection && incomingCollection?.length >= 1 ? card.collection = incomingCollection : null;
                // console.log("iscard not")
                postCard(card);
            }
        } else{
            console.log("no")
        }
    }

    function postCard(card: any){
        setLoading(true);
        fetch("../api/language/save-card", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(card)
        }).then(r => {
            if(r.ok){
                setAddDrawing(false);
                formRef.current?.reset();
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
    }

    function handleCollectionChange(e: ChangeEvent<HTMLButtonElement>){
        e.preventDefault();
        if(incomingCollection === ""){
            setNewCollection(newCollection => !newCollection)
            setIncomingCollection(undefined);
        } else if (incomingCollection === undefined) {
            setNewCollection(newCollection => !newCollection)
            setIncomingCollection("");
        } else if (incomingCollection && newCollection === false){
            setNewCollection(newCollection =>!newCollection);
            setIncomingCollection("");
        } else if(incomingCollection && newCollection === true){
            setNewCollection(newCollection =>!newCollection);
            setIncomingCollection(undefined);
        }
    }

    return (
        <div className="window relative w-80 h-80 z-10">
            <div className="title-bar">
                <div className="title-bar-text">Add New Card</div>
                <div className="title-bar-controls">
                    <button onClick={() => setViewingMode("")} aria-label="Close"></button>
                </div>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className="mt-2 flex flex-col w-full h-[17.5rem] overflow-y-scroll">
                <div className="ml-2 mb-2 flex flex-row">
                    <div>
                        <p>Select a Language:</p>
                        <select value={languageId} onChange={e => setLanguageId(e.target.value)} className="">
                            <option>Indonesian</option>
                            <option>Italian</option>
                            <option>Spanish</option>
                            <option>Japanese</option>
                            <option>French</option>
                        </select>
                    </div>
                    <p className="ml-auto mr-4 mt-[0.07rem]">* optional</p>
                </div>
                <div className="field-row-stacked mx-2">
                    <label>Original</label>
                    <input name="original" type="text" />
                </div>
                <div className="field-row-stacked mx-2">
                    <label>Translation</label>
                    <input name="translation" type="text" />
                </div>
                <div className="field-row-stacked mx-2">
                    {newCollection ?  
                        <>
                            <label>Add to New Collection&nbsp;*</label>
                            <input value={incomingCollection} onChange={(e:any) => setIncomingCollection(e.target.value)} name="collection" type="text" />
                        </> :
                        <>
                            <label>Add to Existing Collection&nbsp;*</label>
                            <select value={incomingCollection} onChange={e => setIncomingCollection(e.target.value)} className="">
                                <option value={undefined}>Select</option>
                                {collectionLoading ? <option>Loading...</option> : collectionsList.map((col: string, i) => {
                                    return <option key={i + col}>{col}</option>
                                })}
                            </select>
                        </>
                    }
                </div>
                <button onClick={(e: any) => handleCollectionChange(e)} className="mx-2 mt-3 mb-2">{!newCollection ? "Add to New" : "Add to Existing"}</button>
                <div className="field-row-stacked mx-2">
                    <label>Phonetic&nbsp;*</label>
                    <input name="phonetic" type="text" />
                </div>
                <div className="field-row-stacked mx-2">
                    <label>Context&nbsp;*</label>
                    <input name="context" type="text" />
                </div>
                <div className="field-row-stacked mx-2">
                    <label>Drawing&nbsp;*</label>
                    {addDrawing ? 
                    <div className="canvas-container mx-auto h-fit mt-4 mb-7">
                        <PixelCanvas setAddDrawing={setAddDrawing} />
                    </div> :
                    <button className="w-[5.25rem]" onClick={() => setAddDrawing(true)}>Add Drawing</button>
                    }
                </div>
                <button disabled={loading ? true : false} className="mt-6 mb-6 w-40 mx-auto" type="submit">{loading ? "LOADING..." : "SUBMIT"}</button>
            </form>
        </div>
    )
}