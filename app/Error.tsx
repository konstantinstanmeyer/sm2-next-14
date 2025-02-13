"use client"

import { SetStateAction, Dispatch } from "react"

export default function Error({setViewingMode}: {setViewingMode: Dispatch<SetStateAction<string>>}){
    return (
        <div className="window w-80 z-10">
            <div className="title-bar">
            <div className="select-none title-bar-text">Error</div>
            <div className="title-bar-controls">
                <button onClick={() => setViewingMode("")} aria-label="Close"></button>
            </div>
            </div>
            <div className="window-body">
                <p>Please sign in the access this page</p>
            </div>
        </div>
    )
}