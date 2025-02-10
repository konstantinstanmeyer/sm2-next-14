"use client"

import { useState } from "react";
import PixelCanvas from "./PixelCanvas";

interface Props {
    language: string;
    text: string;
}

export default function AddCard({ language, text }: Props){
    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    return (
        <div className="pixelify flex flex-col items-center">
            <h2 className="text-2xl">Add Card</h2>
            <form className="my-2 flex flex-col items-center">
                <textarea className="h-fit w-30 bg-[#ffe8ce] border-[1px] rounded-[10px] border-black resize-none px-4 py-3" value={text} />
                <p className={`${isDrawing ? "" : "crossed-out"} cursor-pointer`} onClick={() => setIsDrawing(isDrawing => !isDrawing)}>draw</p>
                {isDrawing ? <PixelCanvas/> : null}
            </form>
        </div>
    )
}