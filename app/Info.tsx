import { Dispatch, SetStateAction } from "react";

export default function Info({ setViewingMode }: { setViewingMode: Dispatch<SetStateAction<string>>}) {
    return (
        <div className="window w-80 z-10">
            <div className="title-bar">
            <div className="select-none title-bar-text">Info</div>
            <div className="title-bar-controls">
                <button onClick={() => setViewingMode("")} aria-label="Close"></button>
            </div>
            </div>
            <div className="window-body">
                <p>This is the info page</p>
            </div>
        </div>
    )
}