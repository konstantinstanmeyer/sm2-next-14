"use client"

import { CardModel } from "@/models/types/models";
import { ReactElement, useState } from "react";

interface Props {
    card: CardModel;
}

export default function SmallCard({ card }: Props){
    const [side, setSide] = useState<boolean>(true);

    return(
        <div onClick={() => setSide(side => !side)}  className='card bg-white h-60  cursor-default thick-shadow text-sm border-black relative mx-2 my-2 border-[1.5px] flex justify-center min-h-32 w-52'>
            {
            side ?
                (
                    <>
                        <p className="absolute top-1 right-2 select-none text-xs">front</p>
                        <p className="mx-4 mt-8 mb-4 h-44 w-48 px-3 py-2 flex items-center border-black border-[1.5px] overflow-y-scroll text-center">{card.original}</p>
                    </>
                ) :
                (
                    <>
                        <p className="absolute top-1 right-2 select-none text-xs">back</p>
                        <p className="mx-4 mt-8 mb-4 h-44 w-48 px-3 py-2 flex items-center border-black border-[1.5px] overflow-y-scroll text-center">{card.translation}</p>
                        <p>{card?.context}</p>
                        <p>{card?.phonetic}</p>
                        {card?.image ? <img src={card.image}/> : null}
                    </>
                )
            }
        </div>
    )
}