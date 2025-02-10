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

    return (
        <div className="pixelify flex flex-col items-center">
            <h2 className="text-2xl">Add Card</h2>
            <form className="my-2 flex flex-col items-center">
                <textarea className="h-fit w-30 bg-[#ffe8ce] border-[1px] rounded-[10px] border-black resize-none px-4 py-3" value={text} />
                <p className={`${isDrawing ? "" : "crossed-out"} cursor-pointer my-2`} onClick={() => setIsDrawing(isDrawing => !isDrawing)}>draw</p>
                {isDrawing ? <PixelCanvas/> : null}
            </form>
            <p onClick={() => setIsAdding(false)} className="cursor-pointer">cancel</p>
        </div>
    )
}