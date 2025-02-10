"use client"

import { Dispatch, SetStateAction, useState } from "react";
import PixelCanvas from "./PixelCanvas";

interface Props {
    language: string;
    text: string;
    setIsAdding: Dispatch<SetStateAction<boolean>>,
}

const WIDTH = 200;
const HEIGHT = 200;

export default function AddCard({ language, text, setIsAdding }: Props){
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [languageId, setLanguageId] = useState<string>(language);
    const [originalText, setOriginalText] =  useState<string>(text);
    const [translation, setTranslation] = useState<string>("");
    const [addPhonetic, setAddPhonetic] = useState<boolean>(false);

    return (
        <div className="pixelify flex flex-col items-center mt-[20vh] mb-[20vh]">
            <h2 className="text-2xl">Add Card</h2>
            <form className="my-2 flex flex-col items-center">
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
                        <textarea className="h-40 w-60 bg-[#ffe8ce] border-[1px] rounded-[10px] border-black resize-none px-4 mb-2 py-3" onChange={(e) => setOriginalText(e.target.value)} value={originalText} />
                    </div>
                    <div className="mx-2">
                        <p>Side #2</p>
                        <textarea className="h-40 w-60 bg-[#ffe8ce] border-[1px] rounded-[10px] border-black resize-none px-4 py-3" onChange={(e) => setTranslation(e.target.value)} value={translation} />
                    </div>
                </div>
                <p>add more:</p>
                <div className="flex flex-row [&>*]:mx-2">
                    <p className={`${isDrawing ? "" : "crossed-out"} cursor-pointer my-2`} onClick={() => setIsDrawing(isDrawing => !isDrawing)}>draw</p>
                    <p className={`${addPhonetic ? "" : "crossed-out"} cursor-pointer my-2`} onClick={() => setAddPhonetic(addPhonetic => !addPhonetic)}>phonetic</p>
                </div>
                <div className="flex flex-row [&>*]:mx-2">
                    {isDrawing && <PixelCanvas/>}
                    {addPhonetic && <textarea className="bg-[#ffe8ce] resize-none px-4 py-3 border-[1px] rounded-[10px] border-black " />}
                </div>
            </form>
            <p onClick={() => setIsAdding(false)} className="cursor-pointer">cancel</p>
        </div>
    )
}