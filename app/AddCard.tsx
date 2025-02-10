"use client"

import { Dispatch, SetStateAction, useState, FormEvent } from "react";
import PixelCanvas from "./PixelCanvas";

interface Props {
    language: string;
    text: string;
    setIsAdding: Dispatch<SetStateAction<boolean>>,
}

export default function AddCard({ language, text, setIsAdding }: Props){
    const [languageId, setLanguageId] = useState<string>(language);
    const [originalText, setOriginalText] =  useState<string>(text);
    const [addDrawing, setAddDrawing] = useState<boolean>(false);
    const [addPhonetic, setAddPhonetic] = useState<boolean>(false);
    const [addContext, setAddContext] = useState<boolean>(false);

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
                    addPhonetic && ((formData?.get("phonetic")) as string).length >= 1 ? card.phonetic = formData.get("phonetic") : null;
                    addContext && ((formData?.get("context")) as string).length >= 1 ? card.context = formData.get("context") : null;
    
                    postCard(card);
                })
            } else {
                addPhonetic && ((formData?.get("phonetic")) as string).length >= 1 ? card.phonetic = formData.get("phonetic") : null;
                addContext && ((formData?.get("context")) as string).length >= 1 ? card.context = formData.get("context") : null;
                postCard(card);
            }
        } else{
            console.log("no")
        }
    }

    function postCard(card: any){
        fetch("../api/language/save-card", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(card)
        }).then(r =>r.json());
    }

    return (
        <div className="pixelify flex flex-col items-center mb-[20vh]">
            <h2 className="text-2xl">Add Card</h2>
            <form onSubmit={handleSubmit} className="my-2 flex flex-col items-center">
                <div className="flex flex-row justify-center mt-2">
                    <p className="mr-2">Language:</p>
                    <select className="bg-[#ffe8ce] thick-shadow border-black border-[1.5px] mb-2" value={language} onChange={(e: any) => setLanguageId(e.target.value)}>
                        <option>Indonesian</option>
                        <option>Italian</option>
                        <option>Spanish</option>
                        <option>Japanese</option>
                        <option>French</option>
                    </select>
                </div>
                <div className="flex flex-row mt-3">
                    <div className="mx-2">
                        <p>Side #1</p>
                        <textarea name="original" className="h-40 thick-shadow w-60 bg-[#ffe8ce] border-[1px] rounded-[10px] border-black resize-none px-4 mb-2 py-3" onChange={(e) => setOriginalText(e.target.value)} value={originalText} />
                    </div>
                    <div className="mx-2">
                        <p>Side #2</p>
                        <textarea name="translation" className="h-40 thick-shadow w-60 bg-[#ffe8ce] border-[1px] rounded-[10px] border-black resize-none px-4 py-3" />
                    </div>
                </div>
                <p>add more:</p>
                <div className="flex flex-row [&>*]:mx-2">
                    <p className={`${addDrawing ? "" : "crossed-out"} cursor-pointer my-2`} onClick={() => setAddDrawing(addDrawing => !addDrawing)}>draw</p>
                    <p className={`${addPhonetic ? "" : "crossed-out"} cursor-pointer my-2`} onClick={() => setAddPhonetic(addPhonetic => !addPhonetic)}>phonetic</p>
                    <p className={`${addContext ? "" : "crossed-out"} cursor-pointer my-2`} onClick={() => setAddContext(addContext => !addContext)}>context</p>
                </div>
                <div className="flex flex-row [&>*]:mx-2">
                    {addDrawing && <PixelCanvas/>}
                    {addPhonetic && <textarea name="phonetic" className="bg-[#ffe8ce] thick-shadow h-[100px] w-[200px] max-h-[200px] px-4 py-3 border-[1px] rounded-[10px] border-black " />}
                    {addContext && <textarea name="context" className="bg-[#ffe8ce] thick-shadow h-[100px] w-[200px] max-h-[200px] px-4 py-3 border-[1px] rounded-[10px] border-black " />}
                </div>
                <button type="submit">submit</button>
            </form>
            <p onClick={() => setIsAdding(false)} className="cursor-pointer">cancel</p>
            {/* <p onClick={() => testServer()}>test</p> */}
        </div>
    )
}