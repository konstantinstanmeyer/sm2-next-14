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

    function getString(){
        const canvas = document.getElementById("drawing-board") as HTMLCanvasElement | null;

        const context = canvas?.getContext("2d") as CanvasRenderingContext2D;

        if(context) {
            let newImageUrl = context.canvas.toDataURL("image/gif", 50);
            console.log(newImageUrl);
        };
    }

    function testServer(){
        fetch("../api/language/save-card", {
            method: "POST",
        }).then(r =>r.json());
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        console.log(formData.get("original"))
    }
    return (
        <div className="pixelify flex flex-col items-center mt-[20vh] mb-[20vh]">
            <h2 className="text-2xl">Add Card</h2>
            <form onSubmit={handleSubmit} className="my-2 flex flex-col items-center">
                <div className="flex flex-row justify-center mt-2">
                    <p className="mr-2">Language:</p>
                    <select className="bg-[#ffe8ce] border-black border-[1.5px] mb-2" value={language} onChange={(e: any) => setLanguageId(e.target.value)}>
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
                        <textarea name="original" className="h-40 w-60 bg-[#ffe8ce] border-[1px] rounded-[10px] border-black resize-none px-4 mb-2 py-3" onChange={(e) => setOriginalText(e.target.value)} value={originalText} />
                    </div>
                    <div className="mx-2">
                        <p>Side #2</p>
                        <textarea name="translation" className="h-40 w-60 bg-[#ffe8ce] border-[1px] rounded-[10px] border-black resize-none px-4 py-3" />
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
                    {addPhonetic && <textarea className="bg-[#ffe8ce] h-[100px] w-[200px] max-h-[200px] px-4 py-3 border-[1px] rounded-[10px] border-black " />}
                    {addContext && <textarea className="bg-[#ffe8ce] h-[100px] w-[200px] max-h-[200px] px-4 py-3 border-[1px] rounded-[10px] border-black " />}
                </div>
                <button type="submit">submit</button>
            </form>
            <p onClick={() => setIsAdding(false)} className="cursor-pointer">cancel</p>
            <p onClick={() => testServer()}>test</p>
        </div>
    )
}