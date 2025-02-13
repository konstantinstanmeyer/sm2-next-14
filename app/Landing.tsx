"use client"

import { Dispatch, SetStateAction } from "react"

export default function Landing({ setViewingMode }: { setViewingMode: Dispatch<SetStateAction<string>>}){
    return (
        <div className="window w-80 z-10">
            <div className="title-bar">
            <div className="select-none title-bar-text">Welcome To SM-2 Learner</div>
            <div className="title-bar-controls">
                <button onClick={() => setViewingMode("")} aria-label="Close"></button>
            </div>
            </div>
            <div className="window-body">
            <p>There are many ways to begin on this site, if you're lost, try the about section. Visit the study page to begin your learning experience!</p>
            </div>
        </div>
    )
}